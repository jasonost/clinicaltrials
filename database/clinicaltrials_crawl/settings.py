
BOT_NAME = 'clinicaltrials_crawl'

SPIDER_MODULES = ['clinicaltrials_crawl.spiders']
ITEM_PIPELINES = {
    'clinicaltrials_crawl.pipelines.ClinicalStudyUpsert': 100,
}

USER_AGENT = 'DiscoverCT (+http://www.discoverct.org)'

LOG_LEVEL="INFO"