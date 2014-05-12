# Clinical Trials Browser

This repository contains code and other files related to visualizing and mining the clinical trials registry data maintained by the National Institutes of Health at [ClinicalTrials.gov](http://clinicaltrials.gov/) and published by the [Clinical Trials Transformation Intiative](http://www.ctti-clinicaltrials.org/) as the [Aggregate Analysis of ClinicalTrials.gov](http://www.ctti-clinicaltrials.org/what-we-do/analysis-dissemination/state-clinical-trials/aact-database) database.

This work began as class projects for [Information Visualization and Presentation](http://www.ischool.berkeley.edu/courses/i247) and [Data Mining and Analytics in Intelligent Business Services](http://www.ischool.berkeley.edu/courses/i290t-dma) courses at University of California, Berkeley's [School of Information](https://www.ischool.berkeley.edu/).

## Data preparation

The [database](database/) and [vizdata](vizdata/) folders of this repository contain the SQL and Python code to create the database tables, upload the data, and extract and transform it for the [D3](http://d3js.org/)-based visualization. All Python files in the repository are in the form of [IPython](http://ipython.org/) notebooks running Python 2.7.6.

## Data visualization

The completed visualization can be viewed on our I School group __[website](http://groups.ischool.berkeley.edu/clinicaltrials/)__.

Upon loading the visualization, the user is presented with a help overlay that explains the main interaction mechanisms and components of the visualization. This can be accessed at any time using the help icon in the upper right hand corner. The initial bubble diagram is organized based on [Medical Subject Headings](http://www.nlm.nih.gov/mesh/) (MeSH) subcategories, and each bubble can be clicked to drill down into the defined MeSH polyhierarchy. A navigation section on the top left describes the current view (total number of trials and patients enrolled), along with breadcrumbs showing the current location within the hierarchy and which selections have been made. A link takes users to the ClinicalTrials.gov registry, showing details of all trials based on the user’s current selection.

The main bubble visualization is complemented by a series of charts that provide additional trial details and comparisons. Each chart compares the current selection characteristics to all interventional trials in the registry. This can be viewed by phase of study, study enrollment and completion status, primary and secondary financial sponsor, continent where the trial was performed, and temporal trends.

The files to support this web visualization are in the [assets](assets/), [css](css/), and [js](js/) folders of this repository, as well as the the [HTML](index.html) file in the main directory.

## Data mining

The data mining project is summarized in a [report](datamining/DataminingFinalReport.md), and the code and other supporting files are in the [datamining](datamining/) folder of this repository.