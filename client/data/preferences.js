var _ = require('lodash');

var preferences = {
  'alcohol': {
    'key': 'risks.alcohol',
    'name': 'Alcohol-friendly',
    'type': 'boolean',
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
  'cancer_treatment': {
    'key': 'risks.cancer_treatment',
    'name': 'Safer while in cancer treatment',
    'type': 'boolean',
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
  'forms': {
    'key': 'forms',
    'name': 'Dosage form',
    'type': 'list',
    'description': 'preferred way of taking your medicine',
    isMatch: function(drugForms, selectedForms) {
      // console.log('DRUG FORMS FORMS', drugForms);
      // console.log('SELECTED FORMS', selectedForms);

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
  'generic_available': {
    'key': 'generic_available',
    'name': 'Generic available (less expensive)',
    'type': 'boolean',
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
  'heart_failure': {
    'key': 'risks.heart_failure',
    'name': 'Safer for people with heart failure',
    'type': 'boolean',
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
    'type': 'boolean',
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
    'type': 'boolean',
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
    'type': 'boolean',
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
    'type': 'boolean',
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