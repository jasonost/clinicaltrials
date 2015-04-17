activate_this = '/groups/clinicaltrials/clinicaltrials/env/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))

import sys
base_path = "/groups/clinicaltrials/public_html"
if base_path not in sys.path:
    sys.path.insert(0,base_path)

from ctapp import app as application
