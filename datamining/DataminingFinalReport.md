### Clinical Trials Data Mining
##### Final Project Summary

#### Background

Clinical studies include interventional and observational studies of human subjects in order to increase medical knowledge. Interventional studies, also known as clinical trials, test the effect of a specific drug, device, procedure, or behavior change, typically in comparison to some known treatment or a placebo (i.e., no treatment or intervention).

In 2013, the National Institutes of Health (NIH) granted $2.9B for research and the pharmaceutical industry spent $28.5B on Phase I-IV clinical trials. The Food and Drug Administration Modernization Act (FDAMA) of 1997 mandated registration of all Phase II-IV clinical trials, and the NIH subsequently created the [ClinicalTrials.gov](http://www.clinicaltrials.gov) registry, which has been more generally adopted since 2005.

Currently there are over 160,000 trials in the registry, which is structured to collect detailed information regarding study design, institutional characteristics, and study outcome and results. Although investigators are beginning to analyze the database, its size and scale have led to an incomplete understanding of the current clinical trials landscape. Investigators have explored overall trends and some have focused on specific specialties or diseases, but these have all been superficial descriptive analyses that have not necessarily led to new insights.

#### Goals and objectives

I used the clinical trials registry data to perform two separate but related data mining analyses, the results of which are described later in this report:

* __Clustering conditions.__ Trials study one or more conditions, such as a disease or disorder, and there are nearly 40,000 unique conditions being studied in registered trials. In order to reduce the dimensionality of these conditions, I sought to cluster them according to how frequently they were studied in combination. I hoped the clusters would highlight interesting patterns of conditions that are studied together, add information to a predictive model (see below), or simply offer a smaller, more understandable set of condition categories.
* __Predicting outcomes.__ The registry provides information about each trial's status or outcome, so I also attempted to build a model that predicts whether a trial completes. It is important to note that incompletion of a trial can be an optimal outcome in some cases, such as when a trial is halted because it is unethical to give the control group a placebo given the effectiveness of the treatment. Nonetheless, there is likely some utility in understanding the factors that suggest a trial will run to completion.

#### Tools and resources

The data for this project came from the [Clinical Trials Transformation Initiative](http://www.ctti-clinicaltrials.org), which prepares an annual data extract of the NIH registry called the Aggregate Analysis of ClinicalTrials.gov, or [AACT](http://www.ctti-clinicaltrials.org/what-we-do/analysis-dissemination/state-clinical-trials/aact-database).

I loaded this data into a MySQL database and conducted exploratory data analysis using SQL queries and Tableau. I used [IPython](http://ipython.org/) notebooks running Python 2.7.6 with [pandas](http://pandas.pydata.org/) and [scikit-learn](http://scikit-learn.org/) for the data manipulation and data mining tasks.

#### Results

##### Clustering conditions

Approximately 30% of trials study more than one condition; on average these multiple-condition trials study 3.1 conditions. My intention was to calculate the Jaccard distance between each pair of conditions, and then use the [DBSCAN](http://en.wikipedia.org/wiki/DBSCAN) clustering algorithm to cluster the conditions based on a matrix of these pair-wise distances.

My original intention to cluster the individual conditions proved untenable for a few reasons:
* condition names could be misspelled or include extra characters that would prevent an exact match with the canonical condition name
* there were simply too many unique conditions, so the Jaccard distances were often zero
* I am not a medical expert and could not evaluate whether a cluster of scientifically-named conditions was reasonable

Helpfully, the NIH and/or trial investigators have classified conditions for over 130,000 trials in the registry according to the [Medical Subject Headings](http://www.nlm.nih.gov/mesh/) (MeSH) polyhierarchy. This reduces the number of distinct conditions to 3,335, but that suffered from the same problems. I thus took advantage of the hierarchical nature of MeSH terms, and translated each condition to its top descriptor-level ancestor. (To be technical, this is the first level below the subcategory, with tree numbers such as "C04.697" and "F03.550".) This produced 204 higher-level condition categories.

The Jaccard distances among these condition categories were more reasonable, although still the distances tended to be clustered near 1. To spread them out for the clustering process, I took the log of the Jaccard similarity (1 - distance) and multiplied by -1. 

I had never used DBSCAN before, so I tried a number of combinations of the minimum cluster size and epsilon parameters. To judge the outcome of each clustering exercise, I calculated the number of clusters, the share of instances in any cluster, the maximum and average cluster size, and the [silhouette coefficient](http://en.wikipedia.org/wiki/Silhouette_(clustering)). This indicated that there existed a few well-defined clusters when the minimum cluster size and epsilon parameters were relatively high, and as those parameters decreased, the number of clusters increased (and average size decreased), but the silhouette coefficient indicated they were highly indistinct.

As such, I developed an algorithm that would iteratively lower the minimum cluster size and epsilon parameters, picking off well-defined and reasonably sized clusters as it went. Once a cluster was defined, those instances were removed from the dataset to reduce interference with later clusters.

The result was 39 clusters representing 78% of the condition categories. The clusters range from 2 to 14 condition categories, with an average of 4.7 condition categories, and their silhouette coefficient was relatively high considering the number of smaller clusters. The condition categories in each cluster are listed below, followed by the list of condition categories that were left unclustered.

| Cluster members |
| --------------- |
| Substance Withdrawal Syndrome, Anxiety Disorders, Sociology, Marijuana Abuse, Substance-Related Disorders, Tobacco Use Disorder, Mood Disorders, Alcohol-Related Disorders, Cocaine-Related Disorders, Behavior, Opioid-Related Disorders |
| Immunologic Deficiency Syndromes, Virus Diseases, Sexually Transmitted Diseases, DNA Virus Infections, Skin Diseases, Viral, Slow Virus Diseases, Hepatitis, Viral, Human, RNA Virus Infections |
| Optic Nerve Diseases, Otorhinolaryngologic Neoplasms, Ocular Motility Disorders, Neurocutaneous Syndromes, Laryngeal Diseases, Cranial Nerve Diseases |
| Orbital Diseases, Eye Diseases, Hereditary, Lacrimal Apparatus Diseases, Eye Diseases, Corneal Diseases |
| Leg Injuries, Hip Injuries, Arm Injuries, Fractures, Bone, Spinal Injuries, Back Injuries |
| Fetal Diseases, Rupture, Pregnancy Complications |
| Genetic Variation, Cellular Structures, Ploidies, Genetic Structures |
| Bone Diseases, Endocrine System Diseases, Dwarfism, Pituitary Diseases |
| Skin Diseases, Parasitic, Helminthiasis, Protozoan Infections |
| Biological Processes, Connective Tissue, Burns |
| Dissociative Disorders, Nervous System Diseases, Autonomic Nervous System Diseases, Somatoform Disorders |
| Radiation Injuries, Environment, Public Health |
| Uveal Diseases, Eye Neoplasms, Retinal Diseases |
| Eye Infections, Viral, Conjunctival Diseases, Eye Infections |
| Tumor Virus Infections, Mycoses, Neoplasms, Experimental |
| Neoplasms, Multiple Primary, Neoplastic Syndromes, Hereditary, Nervous System Malformations |
| Rheumatic Diseases, Joint Diseases, Encephalitis, Viral, Central Nervous System Viral Diseases, Connective Tissue Diseases, Poisoning, Autoimmune Diseases, Demyelinating Diseases, Autoimmune Diseases of the Nervous System, Arbovirus Infections, Neurotoxicity Syndromes |
| Nutrition Disorders, Neurodegenerative Diseases, Anthropometry, Body Constitution, Physiological Processes, Delirium, Dementia, Amnestic, Cognitive Disorders, Neurologic Manifestations, Central Nervous System Diseases, Diagnostic Techniques and Procedures, Neurobehavioral Manifestations, Signs and Symptoms |
| Vascular Diseases, Pathologic Processes, Heart Diseases |
| Craniocerebral Trauma, Spinal Cord Injuries, Trauma, Nervous System |
| Musculoskeletal Abnormalities, Temporomandibular Joint Disorders, Stomatognathic System Abnormalities, Jaw Diseases |
| Ear Diseases, Vision Disorders, Lens Diseases, Refractive Errors, Ocular Hypertension |
| Foot Diseases, Fasciitis, Foot Deformities |
| Wounds, Nonpenetrating, Wounds and Injuries |
| Mental Disorders Diagnosed in Childhood, Schizophrenia and Disorders with Psychotic Features, Personality Disorders, Mental Disorders |
| Immune System Processes, Purpura, Thrombocytopenic |
| Nervous System Physiological Phenomena, Psychophysiology |
| Pharyngeal Diseases, Mouth Diseases, Tooth Diseases |
| Pathological Conditions, Anatomical, Biliary Tract Diseases |
| Muscular Diseases, Tendon Injuries, Neuromuscular Diseases |
| Diabetes Mellitus, Metabolic Diseases |
| Infection, Bacterial Infections |
| Congenital Abnormalities, Cardiovascular Abnormalities |
| Neoplasms, Second Primary, Neoplastic Processes |
| Respiratory Tract Infections, Nose Diseases |
| Respiratory Tract Neoplasms, Bronchial Diseases, Lung Diseases, Hypersensitivity, Respiratory Hypersensitivity |
| Digestive System Neoplasms, Pancreatic Diseases, Endocrine Gland Neoplasms, Infant, Newborn, Diseases, Gonadal Disorders, Lymphatic Diseases, Hematologic Diseases, Gastrointestinal Diseases, Immunoproliferative Disorders, Neoplasms by Histologic Type, Neoplasms by Site |
| Urogenital Neoplasms, Genital Diseases, Male |
| Female Urogenital Diseases, Urologic Diseases |

__Unclustered conditions__: Adrenal Gland Diseases, Cardiovascular Diseases, Cartilage Diseases, Cell Physiological Processes, Chronobiology Disorders, Cysts, Digestive System Abnormalities, Digestive System Diseases, Digestive System Fistula, Dislocations, Eating Disorders, Eyelid Diseases, Fatigue Syndrome, Chronic, Genetic Diseases, Inborn, Graft vs Host Disease, Immune System Diseases, Impulse Control Disorders, Lacerations, Liver Diseases, Musculoskeletal Diseases, Neoplasms, Neoplastic Cells, Circulating, Nervous System Neoplasms, Opportunistic Infections, Paraneoplastic Syndromes, Parathyroid Diseases, Peritoneal Diseases, Pharmacological Phenomena, Pleural Diseases, Precancerous Conditions, Pregnancy Complications, Neoplastic, Reproductive Physiological Phenomena, Respiration Disorders, Respiratory Physiological Phenomena, Respiratory Tract Diseases, Sexual and Gender Disorders, Skin Diseases, Sleep Disorders, Sprains and Strains, Tennis Elbow, Thoracic Injuries, Thyroid Diseases, Urogenital Abnormalities, Wound Infection

##### Predicting outcomes

To my non-expert eye, these clusters look reasonable and offer useful dimensionality reduction of a complex set of data. But how useful are they analytically?

To test this proposition, as well as understand the main drivers of whether a trial completes, I built a series of models to predict trial outcome. There are 85,062 trials in the registry that have an outcome of completed, approved for marketing, suspended, withdrawn, or terminated; the first two of these comprised my "completed" target group, while suspended, terminated, and withdrawn trials comprised my "incomplete" group. Incomplete trials were only 13% of the total, so I downsampled the completed trials to have a balanced number of complete and incomplete trials for my model.

I extracted a number of features from the AACT database to use as [independent variables](prediction/dataset.sql) in the model: trial length; trial [phase](http://clinicaltrials.gov/ct2/about-studies/glossary#phase); trial [type](http://clinicaltrials.gov/ct2/about-studies/glossary#study-type); number of groups and [arms](http://clinicaltrials.gov/ct2/about-studies/glossary#arm); age, gender, and health status eligibility requirements for trial participants; whether the trial is regulated by the FDA or has known safety issues; what type of institution funded the trial; the location and number of facilities used in the trial; details of the trial design and interventions tested; the number of conditions studied; and the conditions clusters from the previous analysis.

I converted all nominal variables into a series of 1/0 dummy variables, and all continuous variables were top-coded if necessary to remove extreme outliers, then standardized to have a mean of zero and standard deviation of one. All missing elements were then replaced with zero. I tested whether it was better to standardize continuous variables globally or within the target categories (complete/incomplete), and standardizing within target category provided slightly higher predictive accuracy on a holdout sample.

At first I tried using [support vector machines](http://en.wikipedia.org/wiki/Support_vector_machine) (SVM), testing various kernel functions and judging each model's predictive power using a ROC curve generated from a 20% holdout test set. The [results](prediction/SVM_ROCcurves.png) indicated that the radial basis function kernel performs best, with an area under the curve of 0.67, but unfortunately the nature of SVM made it difficult to understand which features were the most significant drivers of trial completion.

I then built a [logistic regression](http://en.wikipedia.org/wiki/Logistic_regression) model and used scikit-learn's [recursive feature elimination](http://scikit-learn.org/stable/modules/generated/sklearn.feature_selection.RFE.html) method to rank the variables by importance. Using just 20 of the 90 features in the complete model gave equivalent accuracy as determined by area under the ROC curve generated from the 20% test set; this logistic model provides accuracy that is roughly equivalent to the linear SVM model. Nine out of those top 20 variables were clusters of conditions from the previous exercise, indicating that these clusters provide more than just dimensionality reduction, they are also analytically useful.

The 20 variables in the final logistic regression model are listed below, and also illustrated in a [chart](prediction/logit_coeff_chart.png):

| Independent Variable | Standardized Coefficient |
| -------------------- | ------------------------ |
| Cluster: Biological Processes, Connective Tissue, Burns | -1.18987 |
| Intervention: behavioral | 0.443029 |
| Participants: [healthy volunteers](http://clinicaltrials.gov/ct2/about-studies/glossary#accepts-healthy-volunteers) | 0.555066 |
| Location: Asia | 0.536616 |
| Sponsor: US Federal Government | 0.720476 |
| Cluster: Nervous System Physiological Phenomena, Psychophysiology | -0.729694 |
| Cluster: Wounds, Nonpenetrating, Wounds and Injuries | -0.620453 |
| Cluster: Digestive System Neoplasms, Pancreatic Diseases, Endocrine Gland Neoplasms, Infant, Newborn, Diseases, Gonadal Disorders, Lymphatic Diseases, Hematologic Diseases, Gastrointestinal Diseases, Immunoproliferative Disorders, Neoplasms by Histologic Type, Neoplasms by Site | -0.483794 |
| Cluster: Leg Injuries, Hip Injuries, Arm Injuries, Fractures, Bone, Spinal Injuries, Back Injuries | -0.457997 |
| Cluster: Orbital Diseases, Eye Diseases, Hereditary, Lacrimal Apparatus Diseases, Eye Diseases, Corneal Diseases | 0.395298 |
| Cluster: Neoplasms, Multiple Primary, Neoplastic Syndromes, Hereditary, Nervous System Malformations | -0.503028 |
| Participants: [male only](http://clinicaltrials.gov/ct2/about-studies/glossary#genders-eligible-for-study) | 0.502377 |
| Cluster: Genetic Variation, Cellular Structures, Ploidies, Genetic Structures | -0.33562 |
| Intervention design: [single](http://clinicaltrials.gov/ct2/about-studies/glossary#single-group-design) | -0.439387 |
| Intervention design: [parallel](http://clinicaltrials.gov/ct2/about-studies/glossary#parallel-design) | -0.537975 |
| Cluster: Dissociative Disorders, Nervous System Diseases, Autonomic Nervous System Diseases, Somatoform Disorders | -0.335301 |
| Location: North America | -0.370591 |
| Intervention: device | -0.666337 |
| Observation design: [cohort](http://clinicaltrials.gov/ct2/about-studies/glossary#observational-study-model) | 0.37761 |
| Masking design: [open label](http://clinicaltrials.gov/ct2/about-studies/glossary#open-label) | -0.592197 |


