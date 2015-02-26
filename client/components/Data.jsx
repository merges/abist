var medications = [
  {
    "name": "Methotrexate",
    "name_generic": "methotrexate",
    "name_common": "Methotrexate",
    "name_phonetic": "meth-OH-trex-ate",
    "name_generic_phonetic": "meth-OH-trex-ate",
    "names_brand": [
      "Otrexup",
      "Rheumatrex",
      "Trexall",
      "Rasuvo"
    ],
    "class": [
      "DMARD"
    ],
    "generic_available": true,
    "forms": [
      {
        "name": "tablet (by mouth)"
      },
      {
        "name": "injection"
      }
    ],
    "ptda": {
      "cost": {
        "min": 35,
        "max": 395
      },
      "onset": {
        "unit": "week",
        "min": 4,
        "max": 6
      },
      "frequency": {
        "unit": "week",
        "dose": 1,
        "multiple": 1
      },
      "side_effects": {
        "common": [
          "upset stomach",
          "diarrhea",
          "headache",
          "rash",
          "liver inflammation",
          "cold symptoms"
        ],
        "rare": [
          "lung inflammation"
        ]
      },
      "risks": [
        {
          "name": "tb",
          "risk": 0
        },
        {
          "name": "pregnancy",
          "risk": 2
        },
        {
          "name": "alcohol",
          "risk": 2
        },
        {
          "name": "liver_disease",
          "risk": 2
        }
      ]
    },
    "spl": [
      {
        "name": "Trexall tablet",
        "setid": "e942f8db-510f-44d6-acb5-b822196f5e8c"
      },
      {
        "name": "Rheumatrex tablet",
        "setid": "2cb70aa1-f73a-41c8-9a7f-edbcf1a06efd"
      },
      {
        "name": "generic tablet",
        "setid": "70c09984-2b36-424f-8b27-3fd0cd4e833d"
      }
    ]
  },
  {
    "name": "Hydroxychloroquine",
    "name_generic": "hydroxychloroquine",
    "name_common": "Hydroxychloroquine",
    "name_phonetic": "high-droks-ee-KLOR-oh-kwine",
    "name_generic_phonetic": "high-droks-ee-KLOR-oh-kwine",
    "class": [
      "DMARD",
      "Antimalarial"
    ],
    "generic_available": true,
    "names_brand": [
      "Plaquenil"
    ],
    "forms": [
      {
        "name": "tablet (by mouth)"
      }
    ],
    "ptda": {
      "cost": {
        "min": 430,
        "max": 675
      },
      "onset": {
        "unit": "week",
        "min": 4,
        "max": 8
      },
      "frequency": {
        "unit": "day",
        "dose": 1,
        "multiple": 1
      },
      "side_effects": {
        "common": [
          "upset stomach",
          "diarrhea",
          "headache",
          "rash",
          "liver inflammation",
          "cold symptoms"
        ],
        "rare": [
          "severe liver injury"
        ]
      },
      "risks": [
        {
          "name": "tb",
          "risk": 0
        },
        {
          "name": "pregnancy",
          "risk": 0
        },
        {
          "name": "alcohol",
          "risk": 0
        },
        {
          "name": "liver_disease",
          "risk": 0
        }
      ]
    }
  },
  {
    "name": "Leflunomide",
    "name_generic": "leflunomide",
    "name_common": "Leflunomide",
    "name_phonetic": "leh-FLUH-no-mide",
    "name_generic_phonetic": "leh-FLUH-no-mide",
    "class": [
      "DMARD",
      "Immune system modulator"
    ],
    "generic_available": true,
    "names_brand": [
      "Arava"
    ],
    "forms": [
      {
        "name": "tablet (by mouth)"
      }
    ],
    "ptda": {
      "cost": {
        "min": 430,
        "max": 675
      },
      "onset": {
        "unit": "week",
        "min": 4,
        "max": 8
      },
      "frequency": {
        "unit": "day",
        "dose": 1,
        "multiple": 1
      },
      "side_effects": {
        "common": [
          "upset stomach",
          "diarrhea",
          "headache",
          "rash",
          "liver inflammation",
          "cold symptoms"
        ],
        "rare": [
          "severe liver injury"
        ]
      },
      "risks": [
        {
          "name": "tb",
          "risk": 0
        },
        {
          "name": "pregnancy",
          "risk": 2
        },
        {
          "name": "alcohol",
          "risk": 2
        },
        {
          "name": "liver_disease",
          "risk": 2
        }
      ]
    }
  },
  {
    "name": "Sulfasalazine",
    "name_generic": "sulfasalazine",
    "name_common": "Sulfasalazine",
    "name_phonetic": "suhl-fa-SAL-uh-zeen",
    "name_generic_phonetic": "suhl-fa-SAL-uh-zeen",
    "class": [
      "DMARD"
    ],
    "generic_available": true,
    "names_brand": [
      "Azulfidine"
    ],
    "forms": [
      {
        "name": "tablet (by mouth)"
      }
    ],
    "ptda": {
      "cost": {
        "min": 20,
        "max": 155
      },
      "onset": {
        "unit": "week",
        "min": 4,
        "max": 12
      },
      "frequency": {
        "unit": "day",
        "dose": 2,
        "multiple": 1
      },
      "side_effects": {
        "common": [
          "upset stomach",
          "diarrhea",
          "headache",
          "rash",
          "liver inflammation",
          "cold symptoms"
        ],
        "rare": [
          "severe skin reaction",
          "low blood counts"
        ]
      },
      "risks": [
        {
          "name": "tb",
          "risk": 0
        },
        {
          "name": "pregnancy",
          "risk": 0
        },
        {
          "name": "alcohol",
          "risk": 0
        },
        {
          "name": "liver_disease",
          "risk": 2
        }
      ]
    }
  },
  {
    "name": "Simponi",
    "name_generic": "golimumab",
    "name_common": "Simponi",
    "name_phonetic": "SIM-puh-nee",
    "name_generic_phonetic": "go-LIM-oo-mab",
    "class": [
      "DMARD",
      "TNF inhibitor"
    ],
    "generic_available": false,
    "names_brand": [
      "Simponi"
    ],
    "forms": [
      {
        "name": "injection"
      }
    ],
    "ptda": {
      "cost": {
        "min": 1985,
        "max": 1985
      },
      "onset": {
        "unit": "week",
        "min": 2,
        "max": 4
      },
      "frequency": {
        "unit": "month",
        "dose": 1,
        "multiple": 1
      },
      "side_effects": {
        "common": [
          "redness or soreness where needle enters skin",
          "upset stomach",
          "headache",
          "dizziness",
          "high blood pressure"
        ],
        "rare": [
          "reactivation of tuberculosis",
          "serious infection that needs antibiotic by vein in hospital",
          "cancer (most often skin or blood, like lymphoma"
        ]
      },
      "risks": [
        {
          "name": "tb",
          "risk": 2
        },
        {
          "name": "pregnancy",
          "risk": 1
        },
        {
          "name": "alcohol",
          "risk": 0
        },
        {
          "name": "liver_disease",
          "risk": 0
        }
      ]
    }
  },
  {
    "name": "Humira",
    "name_generic": "adalimumab",
    "name_common": "Humira",
    "name_phonetic": "hew-MEER-uh",
    "name_generic_phonetic": "ad-uh-LIH-muh-mab",
    "class": [
      "DMARD",
      "Biologic",
      "TNF blocker"
    ],
    "generic_available": false,
    "names_brand": [
      "Humira"
    ],
    "forms": [
      {
        "name": "injection"
      }
    ],
    "ptda": {
      "cost": {
        "min": 1830,
        "max": 1830
      },
      "onset": {
        "unit": "week",
        "min": 2,
        "max": 4
      },
      "frequency": {
        "unit": "month",
        "dose": 2,
        "multiple": 1
      },
      "side_effects": {
        "common": [
          "redness or soreness where needle enters skin",
          "upset stomach",
          "headache",
          "dizziness",
          "high blood pressure"
        ],
        "rare": [
          "reactivation of tuberculosis",
          "serious infection that needs antibiotic by vein in hospital",
          "cancer (most often skin or blood, like lymphoma"
        ]
      },
      "risks": [
        {
          "name": "tb",
          "risk": 2
        },
        {
          "name": "pregnancy",
          "risk": 1
        },
        {
          "name": "alcohol",
          "risk": 0
        },
        {
          "name": "liver_disease",
          "risk": 0
        }
      ]
    }
  },
  {
    "name": "Cimzia",
    "name_generic": "certolizumab",
    "name_common": "Cimzia",
    "name_phonetic": "SIM-zee-uh",
    "name_generic_phonetic": "sir-toh-LIZ-uh-mab",
    "class": [
      "DMARD",
      "TNF inhibitor"
    ],
    "generic_available": false,
    "names_brand": [
      "Cimzia"
    ],
    "forms": [
      {
        "name": "injection"
      }
    ],
    "ptda": {
      "cost": {
        "min": 3510,
        "max": 3510
      },
      "onset": {
        "unit": "week",
        "min": 2,
        "max": 4
      },
      "frequency": {
        "unit": "month",
        "dose": 2,
        "multiple": 1
      },
      "side_effects": {
        "common": [
          "redness or soreness where needle enters skin",
          "upset stomach",
          "headache",
          "dizziness",
          "high blood pressure"
        ],
        "rare": [
          "reactivation of tuberculosis",
          "serious infection that needs antibiotic by vein in hospital",
          "cancer (most often skin or blood, like lymphoma"
        ]
      },
      "risks": [
        {
          "name": "tb",
          "risk": 2
        },
        {
          "name": "pregnancy",
          "risk": 1
        },
        {
          "name": "alcohol",
          "risk": 0
        },
        {
          "name": "liver_disease",
          "risk": 0
        }
      ]
    }
  },
  {
    "name": "Enbrel",
    "name_generic": "etanercept",
    "name_common": "Enbrel",
    "name_phonetic": "EN-brel",
    "name_generic_phonetic": "eh-TAN-er-sept",
    "class": [
      "DMARD",
      "TNF blocker",
      "Immune system modulator"
    ],
    "generic_available": false,
    "names_brand": [
      "Enbrel"
    ],
    "names_for_query": [
      "Enbrel",
      "etanercept"
    ],
    "forms": [
      {
        "name": "injection"
      }
    ],
    "ptda": {
      "cost": {
        "min": 1865,
        "max": 1865
      },
      "onset": {
        "unit": "week",
        "min": 2,
        "max": 4
      },
      "frequency": {
        "unit": "week",
        "dose": 1,
        "multiple": 1
      },
      "side_effects": {
        "common": [
          "redness or soreness where needle enters skin",
          "upset stomach",
          "headache",
          "dizziness",
          "high blood pressure"
        ],
        "rare": [
          "reactivation of tuberculosis",
          "serious infection that needs antibiotic by vein in hospital",
          "cancer (most often skin or blood, like lymphoma"
        ]
      },
      "risks": [
        {
          "name": "tb",
          "risk": 2
        },
        {
          "name": "pregnancy",
          "risk": 1
        },
        {
          "name": "alcohol",
          "risk": 0
        },
        {
          "name": "liver_disease",
          "risk": 0
        }
      ]
    }
  },
  {
    "name": "Rituxan",
    "name_generic": "rituximab",
    "name_common": "Rituxan",
    "name_phonetic": "rye-TUX-an",
    "name_generic_phonetic": "rye-TUX-ih-mab",
    "class": [
      "DMARD",
      "Biologic"
    ],
    "generic_available": false,
    "names_brand": [
      "Rituxan"
    ],
    "forms": [
      {
        "name": "infusion (by vein at clinic)"
      }
    ],
    "ptda": {
      "cost": {
        "min": 1105,
        "max": 1105
      },
      "onset": {
        "unit": "week",
        "min": 2,
        "max": 12
      },
      "frequency": {
        "unit": "week",
        "dose": 2,
        "multiple": 2
      },
      "side_effects": {
        "common": [
          "reaction to infusion",
          "upset stomach",
          "headache",
          "dizziness",
          "high blood pressure"
        ],
        "rare": [
          "reactivation of tuberculosis",
          "serious infection that needs antibiotic by vein in hospital",
          "cancer (most often skin or blood, like lymphoma",
          "severe infusion reaction"
        ]
      },
      "risks": [
        {
          "name": "tb",
          "risk": 2
        },
        {
          "name": "pregnancy",
          "risk": 1
        },
        {
          "name": "alcohol",
          "risk": 0
        },
        {
          "name": "liver_disease",
          "risk": 0
        }
      ]
    }
  },
  {
    "name": "Remicade",
    "name_generic": "infliximab",
    "name_common": "Remicade",
    "name_phonetic": "REM-ih-kade",
    "name_generic_phonetic": "in-FLIX-ih-mab",
    "class": [
      "DMARD",
      "TNF inhibitor"
    ],
    "generic_available": false,
    "names_brand": [
      "Remicade"
    ],
    "forms": [
      {
        "name": "infusion (by vein at clinic)"
      }
    ],
    "ptda": {
      "cost": {
        "min": 790,
        "max": 3765
      },
      "onset": {
        "unit": "week",
        "min": 2,
        "max": 4
      },
      "frequency": {
        "unit": "month",
        "dose": 1,
        "multiple": 2
      },
      "side_effects": {
        "common": [
          "reaction to infusion",
          "upset stomach",
          "headache",
          "dizziness",
          "high blood pressure"
        ],
        "rare": [
          "reactivation of tuberculosis",
          "serious infection that needs antibiotic by vein in hospital",
          "cancer (most often skin or blood, like lymphoma",
          "severe infusion reaction"
        ]
      },
      "risks": [
        {
          "name": "tb",
          "risk": 2
        },
        {
          "name": "pregnancy",
          "risk": 1
        },
        {
          "name": "alcohol",
          "risk": 0
        },
        {
          "name": "liver_disease",
          "risk": 0
        }
      ]
    }
  },
  {
    "name": "Orencia",
    "name_generic": "abatacept",
    "name_common": "Orencia",
    "name_phonetic": "or-EN-see-uh",
    "name_generic_phonetic": "a-BAH-tuh-sept",
    "class": [
      "DMARD",
      "Biologic"
    ],
    "generic_available": false,
    "names_brand": [
      "Orencia"
    ],
    "forms": [
      {
        "name": "infusion (by vein at clinic)"
      }
    ],
    "ptda": {
      "cost": {
        "min": 1185,
        "max": 2365
      },
      "onset": {
        "unit": "week",
        "min": 2,
        "max": 4
      },
      "frequency": {
        "unit": "month",
        "dose": 1,
        "multiple": 1
      },
      "side_effects": {
        "common": [
          "reaction to infusion",
          "upset stomach",
          "headache",
          "dizziness",
          "high blood pressure"
        ],
        "rare": [
          "reactivation of tuberculosis",
          "serious infection that needs antibiotic by vein in hospital",
          "cancer (most often skin or blood, like lymphoma",
          "severe infusion reaction"
        ]
      },
      "risks": [
        {
          "name": "tb",
          "risk": 2
        },
        {
          "name": "pregnancy",
          "risk": 1
        },
        {
          "name": "alcohol",
          "risk": 0
        },
        {
          "name": "liver_disease",
          "risk": 0
        }
      ]
    }
  },
  {
    "name": "Actemra",
    "name_generic": "tocilizumab",
    "name_common": "Actemra",
    "name_phonetic": "ak-TEM-ra",
    "name_generic_phonetic": "toh-sil-IZ-oo-mab",
    "class": [
      "DMARD",
      "Biologic",
      "IL6 inhibitor"
    ],
    "generic_available": false,
    "names_brand": [
      "Actemra"
    ],
    "forms": [
      {
        "name": "infusion (by vein at clinic)"
      }
    ],
    "ptda": {
      "cost": {
        "min": 1115,
        "max": 2230
      },
      "onset": {
        "unit": "week",
        "min": 2,
        "max": 4
      },
      "frequency": {
        "unit": "month",
        "dose": 1,
        "multiple": 1
      },
      "side_effects": {
        "common": [
          "reaction to infusion",
          "upset stomach",
          "headache",
          "dizziness",
          "high blood pressure"
        ],
        "rare": [
          "reactivation of tuberculosis",
          "serious infection that needs antibiotic by vein in hospital",
          "cancer (most often skin or blood, like lymphoma",
          "severe infusion reaction"
        ]
      },
      "risks": [
        {
          "name": "tb",
          "risk": 2
        },
        {
          "name": "pregnancy",
          "risk": 1
        },
        {
          "name": "alcohol",
          "risk": 0
        },
        {
          "name": "liver_disease",
          "risk": 0
        }
      ]
    }
  }
];

module.exports = medications;