#!/usr/bin/perl
use warnings;
use strict;
use IO::File;
use lib '../lib';
use GVF_DB_Connect;
use GVF::DB::Variant;
use Utils;
#use Data::Dumper;

my $usage = "\n

DESCRIPTION:
                    Takes Cosmic file and outputs Cosmic.gvf file.
                    Additionally adds data to GVF_DB_Variant database
                    
                    Used for COSMIC version 56.

                    Please verify your columns as they change each
                    release.

USAGE:		    ./Cosmic_parser.pl <cosmic file> <GVF filename>

\n";


# I/O
my $in_file = IO::File->new( $ARGV[0], 'r' )
    || die "Can't open file $!\n $usage";
my $gvf_out = IO::File->new($ARGV[1], 'w')
    || die "Can't open file to write to $!\n";

# handle to connect to db.
my $dbxh = GVF::DB::Variant->connect( 'dbi:mysql:GVF_DB_Variant', 'username', 'password');

# header.    
print $gvf_out "##gvf-version 1.06\n##Cosmic\n\n";

my ($count, @cosmic);
while ( defined( my $line = <$in_file> ) ) {

    chomp $line;
    
    # Only need to see it once.
    if ( $line =~ /^Gene/ ) { next }

	my (
		$Gene_name, $Accession_Number,
		$Gene_CDS_length, $HGNC_ID, $Sample_name,
		$ID_sample, $ID_tumour, $Primary_site, 
		$Site_subtype, $Primary_histology, $Histology_subtype,
		$Genome_wide_screen, $Mutation_ID, $Mutation_CDS, 
		$Mutation_AA, $Mutation_Description, $Mutation_zygosity,
		$Mutation_NCBI36_genome_position, $Mutation_NCBI36_strand,
		$Mutation_GRCh37_genome_position, $Mutation_GRCh37_strand,
		$Mutation_somatic_status, $Pubmed_PMID, $Sample_source,
		$Tumour_origin, $Comments
	) = split(/\t/, $line);



    # Passing any lines not containing positions.
    if ( ! $Mutation_GRCh37_genome_position ) { next }
    
    # Current version of Cosmic is
    my $version = '56';
    
    ## Creating first 8 columns.
        my ( $start, $end ) = seqid_pos_builder($Mutation_GRCh37_genome_position, 'start-end');

        my $column1 = seqid_pos_builder($Mutation_GRCh37_genome_position, 'seqid');
        my $column2 = 'cosmic';
        my $column3 = so_term_builder($Mutation_Description);
        my $column4 = $start;
        my $column5 = $end;
        my $column6 = '.';
        my $column7 = $Mutation_GRCh37_strand;
        my $column8 = '.';
    
        my $eight = join ("\t", $column1, $column2, $column3, $column4, $column5, $column6, $column7, $column8);

    ## Attributes
        $count++;
        $Mutation_somatic_status =~ s/\s/\_/g;
        
        my $id    = "ID=$column1:$column2:$column3:$column4:$count";
        my $alias = "Alias=$Gene_name";
        
        # Caputre the var and ref seqs.
        my ($var_seq, $ref_seq) = seq_grabber($Mutation_CDS, $Mutation_GRCh37_strand);	

	if($var_seq and $ref_seq)
	{	
		# List of attributes which are unique for COSMIC.
		my $hgnc        = "Hgnc=$HGNC_ID";
        	my $mut_aa      = "Amino_acid_mutation=$Mutation_AA";
        	my $sample      = "Sample_name=$Sample_name";
        	my $sample_id   = "Id_sample=$ID_sample";
        	my $tumour_id   = "Id_tumor=$ID_tumour";
        	my $prim_site   = "Primary_site=$Primary_site";
        	my $site_sub    = "Site_subtype=$Site_subtype";
        	my $pri_hist    = "Primary_histology=$Primary_histology";
        	my $his_subtype = "Histology_subtype=$Histology_subtype";
        	my $mutation_id = "Mutation_id=$Mutation_ID";
        	my $mutationCds = "Mutation_CDS=$Mutation_CDS";
        	my $acc_numb    = "Accession_number=$Accession_Number";
        	my $mutant_stat = "Mutation_somatic_status=$Mutation_somatic_status";
               
        	my $atts = join (';', $id, $alias, $var_seq, $ref_seq, $hgnc, $sample, $sample_id, $tumour_id, $prim_site,
                         $site_sub, $pri_hist, $his_subtype, $mutation_id, $mut_aa, $mutationCds, $acc_numb, $mutant_stat ) or die "Died on this line:\t$line\n";

    		# Remove excess semicolons.
    		$atts =~ s/\;{2,}/;/g;

    		my $cosmic_gvf = "$eight\t$atts";
    		print $gvf_out "$cosmic_gvf\n";
     }

}


############################# SUBROUTINES #########################

sub make_cosmic_hash_ref
{
	my $line = shift;

	my @parts = split(/\t/, $line);
	
	my $cosmic_hash_ref = setup_cosmic_hash();	
	for (my $I=0; $I <= $#parts; $I++)
	{
		my $line_elment = $parts[$I];
			
	}		
								
}

sub setup_cosmic_hash
{	
	my @cosmic_line_elements = (
	"Gene_name", "Accession_Number", "HGNC_ID", "Sample_name", "ID_sample",
	"ID_tumour", "Primary_site", "Site_subtype", "Primary_histology", 
	"Histology_subtype", "Genome_wide_screen", "Mutation_ID", "Mutation_CDS", 
	"Mutation_AA", "Mutation_Description", "Mutation_zygosity", 
	"Mutation_NCBI36_genome_position", "Mutation_NCBI36_strand", 
	"Mutation_GRCh37_genome_position", "Mutation_GRCh37_strand",
	"Mutation_somatic_status", "Pubmed_PMID", "Sample_source", "Tumour_origin", 
	"Sample_source", "Tumour_origin", "Comments" 
	);

	my %cosmic_line_hash;	
	foreach my $element (@cosmic_line_elements)
	{
		$cosmic_line_hash{$element}="unknown";		
	} 		

	return \%cosmic_line_hash;
}







