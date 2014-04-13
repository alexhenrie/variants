#!/usr/bin/perl
use warnings;
use strict;
use lib '/u01/dence/Projects/GVF_DB_project/GVF_DB_Variant/lib'; 
use Utils;
use GVF_DB_Connect;
use GVF::DB::Variant;
use IO::File;
use Carp;
use Getopt::Long;
#use Data::Dumper;

#our ($VERSION) = '$Revision: 1 $' =~ m{ \$Revision: \s+ (\S+) }x;

# Script by Shawn Rynearson For Karen Eilbeck
# shawn.rynearson@gmail.com

my $usage = "\n

DESCRIPTION:
	                Parsing script which takes gvf file and stores metadata and 
			gvf line in data structures.
			Options allow you to added to all tables in GVF_Variant 
			database or 'data' to view the data structures.

USAGE:			./GVFParser.pl -option <GVF_file> 

OPTIONS(required):
			 Each option corresponds to a table in the database.

			- all 	Option will add all areas of GVF file to database
				and run Tabix scripts to add Thousandgenomes and
				Cosmic data.

			- data	Will print out the data structures to view.

\n";

my ($all, $data, $username, $password, $database);
my $input = $ARGV[$#ARGV] || croak $usage;
my $cosmic_file = "../tabix/Cosmic.v63.sorted.gvf.gz";
my $thousandgenomes_files = "../tabix/ThousandGenome.gz";
 
GetOptions( 

	'all'  => \$all,
	'data' => \$data,
	'username=s'=>\$username,
	'password=s'=>\$password,
	'database=s'=>\$database

) || die $usage; 


#I/O
my $GVF_FILE = IO::File->new( $input, 'r') || croak "Could not open this GVF file:\t$input\n $usage\n";



# handle to connect to db.
my $dbi_string='dbi:mysql:' . $database;
my $dbxh = GVF::DB::Variant->connect( $dbi_string, $username, $password);

# Where the magic happens.
my (@meta, @gvf);
while ( my $line  = <$GVF_FILE> ) {
	chomp $line;

	if ($line =~ /^#/) {
               push @meta, $line;	
	}
	elsif ($line =~ /^c/){
		push @gvf, $line;
	}
	else
	{
		print "No match for this line:\t$line\n";
	}
}

# the data structures.
my $parsed_meta = parse_metadata(\@meta);
my $parsed_gvf = parse_gvf(\@gvf);
print "Parsed the data\n";

## -- send to GVF_DB_Connect to add to the database -- ##

# This order needs to be maintaned.
if ($all) {
	individual($dbxh, $parsed_meta, $parsed_gvf);
	print "populated the individual table\n";
	variant($dbxh, $parsed_gvf);
	print "populated the variant table\n";

	my $tabix_string = "./TabixToDB.pl -thousand ";
	$tabix_string .= "-username=$username ";
	$tabix_string .= "-password=$password ";
	$tabix_string .= "-database=$database ";
	#$tabix_string .= "$input";
	$tabix_string .= "../tabix/phase1_release_v2.20101123_chrAll.gvf.only_SNV.gz";
	#$tabix_string .= "../tabix/ThousandGenome.gz";
	print "$tabix_string\n";
	system $tabix_string;
	print "Finished with the tabix script\n";

	genome_scope($dbxh, $parsed_meta );
	print "populated the genome_scope table\n";
	genome_variant_relation($dbxh);
	print "populated the genome_variant_relation table\n";
	variant_effect($dbxh, $parsed_gvf);
	print "variant_effect table\n";
	individual_phenotype($dbxh, $parsed_meta);
	print "individual_phenotype table\n";
	$tabix_string = "./TabixToDB.pl -cosmic ";
	$tabix_string .= "-username=$username ";
	$tabix_string .= "-password=$password ";
	$tabix_string .= "-database=$database ";
	$tabix_string .= "../tabix/Cosmic.v63.sorted.gvf.gz";
	print "$tabix_string\n";
	system $tabix_string;
}

if ($data) {
	print "\nFirst section is meta data followed by gvf data\n";
	print Dumper($parsed_meta, $parsed_gvf);
}

