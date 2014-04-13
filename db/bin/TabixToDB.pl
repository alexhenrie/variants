#!/usr/bin/perl -w 
use strict;
use lib '/u01/dence/Projects/GVF_DB_project/GVF_DB_Variant/lib';
use Tabix;
use IO::File;
use GVF_DB_Connect;
use GVF::DB::Variant;
use Getopt::Long;
#use Data::Dumper;

# Script by Shawn Rynearson For Karen Eilbeck
# shawn.rynearson@gmail.com

my $usage = "\n

DESCRIPTION:
			Collects all Chromosomes and start position from GVF DB
			compairs them with tabix version of 1000G file and Cosmic.
			then adds them to existing database tables.
			*** Must perform on tabix-ed files.
USAGE:

			./TabixToDB.pl -option <tabix file>
		
OPTIONS(required):
			 Each option corresponds to a table in the database.

			- thousand	Preform search against thousandgenomes file. 

			- cosmic	Preform search against cosmic file.
\n";

# Options for 1000k genome match or Cosmic
my ( $thousand, $cosmic,$username, $password, $database);
my $input = $ARGV[$#ARGV];

GetOptions( 

	'thousand'  => \$thousand,
	'cosmic'    => \$cosmic,
	'username=s' => \$username,
	'password=s' => \$password,
	'database=s' => \$database

) || die $usage;

# db handle.
my $dbxh_string="dbi:mysql:". $database;
my $dbxh = GVF::DB::Variant->connect( $dbxh_string, $username, $password)|| die "Can't connect to db\n";

# object and vars.
my $tab = Tabix->new(-data => $input) || die "Please input Tabix file $usage\n";


# Collect current id from database
my $fkey_obj = $dbxh->resultset('Individual')->search;
my $rs_column = $fkey_obj->get_column('id');
my $max_id = $rs_column->max;

my ( @thousandList, @cosmicList );

# collects the start position from database
my $var_obj = $dbxh->resultset('Variant')->search || die "resultset dbxh failed\n";
while (my $key = $var_obj->next) {
	my $id       = $key->id;
        my $chr      = $key->source;
        my $type     = $key->type;
        my $start    = $key->start;
        my $end      = $key->end;
	my $ref_seq  = $key->reference_sequence;
	my $max_var  = $key->individual_id;
	
	# Must have range which enclude the position.
	my $iter = $tab->query($chr, $start - 1, $end + 1);
	#print "This is var_obj:\t$id\t$chr\t$type\t$start\t$end\n";
	my $tmp_start=$start - 1;
	my $tmp_end = $end + 1;
	print "This is the query:\t$chr\t$tmp_start\t$tmp_end\n";
	
	while ( my $read = $tab->read($iter)) {
		print $read,"\n";

		if ( $thousand ){
			my ($_chr, $_source, $_type, $_start, $_end,
			$length, $strand, $col, $remainder ) = split /\t/, $read;
				
			next unless $chr eq $_chr && $start == $_start;
			my @tmp_list;
			push @tmp_list, [$read, $id, $max_var] if $max_id eq $max_var;
			M_genomes($dbxh, \@tmp_list);
			#push @thousandList, [$read, $id, $max_var] if $max_id eq $max_var;
		}

		if ( $cosmic ){
			my ( $_chr, $type, $soTerm, $_start, $_end, $remainder) = split /\t/, $read;
			
			next unless $chr eq $_chr && $start == $_start;
			my @tmp_list;
			push @tmp_list, [$read, $id];
			cosmic($dbxh, \@tmp_list);
			#push @cosmicList, [$read, $id];
		}
    	}
}

# Send to DB.
#if ( $thousand ) { M_genomes($dbxh, \@thousandList); }

# Send to DB.
#if ( $cosmic ) { cosmic($dbxh, \@cosmicList ); }


print "$#cosmicList\n";

#print "@cosmicList\n";


