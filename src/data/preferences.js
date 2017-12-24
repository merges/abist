var _ = require('lodash');

var preferences = {
  'forms': {
    'key': 'forms',
    'name': 'Dosage form',
    'name_short': 'Dosage form',
    'type': 'list',
    'icon': null,
    'description': 'preferred way of taking your medicine',
    isMatch: function(drugForms, selectedForms) {
      if (drugForms) {
        _.each(drugForms, function(form) {
          if (selectedForms[form.name] == true) {
            return false;
          }
        })
      }
      return true;
    },
  },
  'alcohol': {
    'key': 'risks.alcohol',
    'name': 'Alcohol-friendly',
    'name_short': 'Alcohol-friendly',
    'type': 'boolean',
    'icon': 'ss-cocktail',
    'description': 'If you drink alcohol',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
  },
  // 'cost': {
  //   'key': 'cost',
  //   'name': 'Cost',
  //   'type': 'number',
  //   'description': 'average cost per month'
  // },
  // 'class': {
  //   'key': 'class',
  //   'name': 'Drug class',
  //   'type': 'list',
  //   'description': 'Drug classes'
  // },
  'generic_available': {
    'key': 'generic_available',
    'name': 'Generic available (less expensive)',
    'name_short': 'Generic available',
    'type': 'boolean',
    'icon': 'ss-moneybag',
    'description': 'A cheaper, generic version is available',
    isMatch: function(genericAvailable) {
      if (genericAvailable === true) {
        return true;
      }
      if (genericAvailable === false) {
        return false;
      }
    }
  },
  'cancer_treatment': {
    'key': 'risks.cancer_treatment',
    'name': 'Safer if in cancer treatment',
    'name_short': 'In cancer treatment?',
    'type': 'boolean',
    'icon': 'ss-dna',
    'description': 'If you’re undergoing cancer treatment with surgery, chemotherapy, or radiation therapy',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
  },
  'heart_failure': {
    'key': 'risks.heart_failure',
    'name': 'Safer for people with heart failure',
    'name_short': 'Have heart failure?',
    'type': 'boolean',
    'icon': 'ss-anatomicalheart',
    'description': 'if you have level III or IV heart failure',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
  },
  'kidney_disease': {
    'key': 'risks.kidney_disease',
    'name': 'Safer for kidney disease',
    'name_short': 'Have kidney disease?',
    'type': 'boolean',
    'icon': 'ss-steak',
    'description': 'if you have kidney disease',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
  },
  'liver_disease': {
    'key': 'risks.liver_disease',
    'name': 'Safer for liver disease',
    'name_short': 'Have liver disease?',
    'type': 'boolean',
    'icon': 'ss-steak',
    'description': 'if you have liver disease',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
  },
  'pregnancy': {
    'key': 'risks.pregnancy',
    'name': 'Safer for pregnancy',
    'name_short': 'Pregnancy',
    'type': 'boolean',
    'icon': 'ss-bbqapron',
    'description': 'if you’re pregnant or considering it',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
  },
  'tb': {
    'key': 'risks.tb',
    'name': 'Safer for tuberculosis',
    'name_short': 'At risk for TB?',
    'type': 'boolean',
    'icon': 'ss-snowflake',
    'description': 'if you have or might be exposed to tuberculosis',
    isMatch: function(object) {
      if (object) {
        if (object.risk == 2) {
          return 'unsafe';
        }
        if (object.risk == 1) {
          return 'possibly unsafe';
        }
        if (object.risk == 0) {
          return 'safe';
        }
      }
      return 'unknown';
    }
  }
};

module.exports = preferences;