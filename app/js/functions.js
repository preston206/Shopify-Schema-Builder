
// TYPE PICKER
const scrollToType = selectedOption => {
  document.getElementById(`${selectedOption.value}`).scrollIntoView({ behavior: "smooth" });
};

// TOGGLE SELECTED TYPE INDICATOR
const toggleIndicator = event => {
  const dataType = document.getElementById(event.target.id).getAttribute("data-shopify-type");
  document.getElementById(`${dataType}_heading`).classList.toggle('selected');
};


// QUANTITY VALIDATION
const quantityValidator = event => {
  if (event.target.value < 1) {
    document.getElementById(event.target.id).value = 1;
  };

  if (event.target.value > 42) {
    document.getElementById(event.target.id).value = 42;
  };
};


// EMPTY SCHEMA SHELLS
const getSchema = (schema, settings=[]) => {

  let schemaObj = {};

  switch (schema) {
    case "shell-dynamic":

    schemaObj.name = "Dynamic Schema";
    schemaObj.settings = [{}];
    schemaObj.presets = [
      {
        "name": "Dynamic Schema",
        "category": "Homepage"
      }
    ];

      break;

    case "shell-dynamic-wb":

      schemaObj.name = "Dynamic Schema";
      schemaObj.settings = [{}];
      schemaObj.blocks = [
        {
          "type": "block",
          "name": "Block",
          "limit": 3,
          "settings": [
            {}
          ]
        }
      ];
      schemaObj.presets = [
        {
          "name": "Dynamic Schema",
          "category": "Homepage"
        }
      ];

      break;

    case "shell-static":

      schemaObj.name = "Static Schema";
      schemaObj.settings = [{}];

      break;

    case "shell-static-wb":

      schemaObj.name = "Static Schema";
      schemaObj.settings = [{}];
      schemaObj.blocks = [
        {
          "type": "block",
          "name": "Block",
          "limit": 3,
          "settings": [
            {}
          ]
        }
      ];

      break;

    case "full-dynamic":

      schemaObj.name = "Dynamic Schema";
      schemaObj.settings = settings;
      schemaObj.presets = [
        {
          "name": "Dynamic Schema",
          "category": "Homepage"
        }
      ];

      break;

    case "full-dynamic-wb":

      schemaObj.name = "Dynamic Schema";
      schemaObj.settings = settings;
      schemaObj.blocks = [
        {
          "type": "block",
          "name": "Block",
          "limit": 3,
          "settings": [
            {}
          ]
        }
      ];
      schemaObj.presets = [
        {
          "name": "Dynamic Schema",
          "category": "Homepage"
        }
      ];

      break;

    case "full-static":

      schemaObj.name = "Static Schema";
      schemaObj.settings = settings;

      break;

    case "full-static-wb":

      schemaObj.name = "Static Schema";
      schemaObj.settings = settings;
      schemaObj.blocks = [
        {
          "type": "block",
          "name": "Block",
          "limit": 3,
          "settings": [
            {}
          ]
        }
      ];

      break;
  
    default:
      break;
  };

  return document.getElementById("schemaCode").innerHTML = JSON.stringify(schemaObj, null, 2);
};


// PLACEHOLDERS
const getPlaceholderText = () => {
  placeholders = [
    "placeholder",
    "color",
    "background",
    "padding",
    "margin",
    "input",
    "text",
    "textarea",
    "url",
    "link",
    "logo",
    "image",
    "video",
    "width",
    "height",
    "icon",
    "footer",
    "header",
    "title",
    "subtitle",
    "heading",
    "subheading",
    "description",
    "message",
    "tagline",
    "column",
    "menu",
    "nav",
    "announcement",
    "banner",
    "font",
    "promo",
    "settings",
    "enable",
    "disable",
    "radio",
    "checkbox",
    "shop",
    "product",
    "article",
    "blog",
    "collection",
    "range",
    "select",
    "dropdown",
    "mobile",
    "block",
    "section",
    "slider",
    "hero",
    "html",
    "hover",
    "cart",
    "account",
    "type",
    "reverse",
    "overlay",
    "opacity",
    "visible",
    "hidden",
    "shadow",
    "border",
    "button",
    "outline",
    "solid",
    "hotpink",
    "teal",
    "#ffff00",
    "BINGO",
    "Golden Ticket",
    "pizza with pineapple",
    "winner",
    "whammy"
  ];

  return placeholders[ Math.floor(Math.random()*73) ];
};


// GET VALUE FOR TYPE INPUTS
// returns either the value that is entered into the input, or a placeholder, or an empty string
const getValue = (id, range=false, rangeSpec=null) => {
  if (id.value.length > 0) {
    switch (rangeSpec) {
      case "min":
        return parseInt(id.value);
      break;

      case "max":
        return parseInt(id.value);
      break;

      case "step":
        return parseInt(id.value);
      break;
    
      default:
        return id.value;
        break;
    };

  }
  else if (document.getElementById(`enable_placeholders`).checked == false) {
    // if the "Use Fake Data" checkbox is not checked then enter this block...
    // this needs to return a space rather than an empty string
    // because if it is empty it causes the 'default' and 'info'
    // fields to get excluded when the schema types are built
    // because there is a condition in place that checks for data and excludes if not found
    return " ";
  }
  else if (id.value.length < 1 && range == true) {
    switch (rangeSpec) {
      case "min":
        return (id.value.length > 0) ? id.value : Math.floor(Math.random()*5);
      break;

      case "max":
        // this needs to be greater than "min", so add 10
        return (id.value.length > 0) ? id.value : Math.floor(Math.random()*20)+10;
      break;

      case "step":
        // this can't be 0, so add 1
        return (id.value.length > 0) ? id.value : Math.floor(Math.random()*4)+1;
      break;

      case "unit":
        return (id.value.length > 0) ? id.value : "px";
      break;
    
      default:
        break;
    };
  }
  else {
    return getPlaceholderText();
  };
};


// NOTE: the functions below, for getting the schema types, need to be in the global space so they have been declared with "function" instead of "const" -- Don't Change The Declaration
// GET TYPE - CATEGORY: STANDARD
function getStandardCat(type) {
  let typeObj = {}, typeInfo = "", typeDefault = "";
  let qty = getValue(document.getElementById(`${type}_qty`));
  let shopifyType = document.getElementById(`${type}`).getAttribute('data-shopify-type');
  let typeId = getValue(document.getElementById(`${type}_id`));
  let typeLabel = getValue(document.getElementById(`${type}_label`));

  if (document.getElementById(`${type}_default_exclude`).checked == false) {
    typeDefault = getValue(document.getElementById(`${type}_default`));
  };
  
  if (document.getElementById(`${type}_info_exclude`).checked == false) {
    typeInfo = getValue(document.getElementById(`${type}_info`));
  };

  if (typeDefault.length < 1 && typeInfo.length < 1) {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
  }
  else if (typeDefault.length > 0 && typeInfo.length > 0) {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
    typeObj.default = typeDefault;
    typeObj.info = typeInfo;
  }
  else if (typeDefault.length > 0) {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
    typeObj.default = typeDefault;
  }
  else {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
    typeObj.info = typeInfo;
  };


  if (qty > 1) {
    let multiObj = [];

    while (qty > 0) {
      multiObj.push(typeObj);
      qty--;
    };

    typeObj = multiObj;
  };

  return typeObj;
};


// GET TYPE - CATEGORY: OPTIONS
function getOptionsCat(type) {
  let typeObj = {}, typeInfo = "", options = [];
  let qty = getValue(document.getElementById(`${type}_qty`));
  let shopifyType = document.getElementById(`${type}`).getAttribute('data-shopify-type');
  let typeId = getValue(document.getElementById(`${type}_id`));
  let typeLabel = getValue(document.getElementById(`${type}_label`));
  
  if (document.getElementById(`${type}_info_exclude`).checked == false) {
    typeInfo = getValue(document.getElementById(`${type}_info`));
  };

  let optionValue = getValue(document.getElementById(`${type}_option_value`));
  let optionLabel = getValue(document.getElementById(`${type}_option_label`));
  let optionQty = getValue(document.getElementById(`${type}_option_qty`));

  let typeDefault = (document.getElementById(`${type}_default`).value.length > 0) ?
  document.getElementById(`${type}_default`).value : optionValue;

  let option = {};
  option[optionValue] = optionLabel;

  options.push(option);

  if (optionQty > 1) {
    let multiOpts = [];

    while (optionQty > 0) {
      multiOpts.push(option);
      optionQty--;
    };

    options = multiOpts;
  };

  if (typeInfo.length > 0) {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
    typeObj.info = typeInfo;
    typeObj.options = options;
    typeObj.default = typeDefault;
  }
  else if (typeInfo.length < 1) {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
    typeObj.options = options;
    typeObj.default = typeDefault;
  };

  if (qty > 1) {
    let multiObj = [];

    while (qty > 0) {
      multiObj.push(typeObj);
      qty--;
    };

    typeObj = multiObj;
  };

  return typeObj;
};


// GET TYPE - CATEGORY: INFORMATIVE
function getInformativeCat(type) {
  let typeObj = {};
  let qty = getValue(document.getElementById(`${type}_qty`));
  let shopifyType = document.getElementById(`${type}`).getAttribute('data-shopify-type');
  let typeContent = getValue(document.getElementById(`${type}_content`));

  typeObj.type = shopifyType;
  typeObj.content = typeContent;

  if (qty > 1) {
    let multiObj = [];

    while (qty > 0) {
      multiObj.push(typeObj);
      qty--;
    };

    typeObj = multiObj;
  };

  return typeObj;
};


// GET TYPE - CATEGORY: RANGE
function getRangeCat(type) {
  let typeObj = {}, typeInfo = "", typeDefault = "";
  let qty = getValue(document.getElementById(`${type}_qty`));
  let shopifyType = document.getElementById(`${type}`).getAttribute('data-shopify-type');
  let typeId = getValue(document.getElementById(`${type}_id`));
  let typeLabel = getValue(document.getElementById(`${type}_label`));

  if (document.getElementById(`${type}_info_exclude`).checked == false) {
    typeInfo = getValue(document.getElementById(`${type}_info`));
  };

  let specMin = getValue(document.getElementById(`${type}_spec_min`), true, "min");
  let specMax = getValue(document.getElementById(`${type}_spec_max`), true, "max"); 
  let specStep = getValue(document.getElementById(`${type}_spec_step`), true, "step");
  let specUnit = getValue(document.getElementById(`${type}_spec_unit`), true, "unit");

  if (document.getElementById(`enable_placeholders`).checked == true) {
    // Range default is supposed to fall between min and max so grab the val from max and minus 2
    // it should also be a multiple of "step" but for the fake data there is currently no attempt to make that happen- it's just random
    typeDefault = (document.getElementById(`${type}_default`).value.length > 0) ?
    parseInt(document.getElementById(`${type}_default`).value) : specMax-2;
  }
  else {
    typeDefault = (document.getElementById(`${type}_default`).value.length > 0) ?
    parseInt(document.getElementById(`${type}_default`).value) : " ";
  }

  if (typeInfo.length > 0) {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
    typeObj.info = typeInfo;
    typeObj.min = specMin;
    typeObj.max = specMax;
    typeObj.step = specStep;
    typeObj.unit = specUnit;
    typeObj.default = typeDefault;   
  }
  else if (typeInfo.length < 1) {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
    typeObj.min = specMin;
    typeObj.max = specMax;
    typeObj.step = specStep;
    typeObj.unit = specUnit;
    typeObj.default = typeDefault;
  };

  if (qty > 1) {
    let multiObj = [];

    while (qty > 0) {
      multiObj.push(typeObj);
      qty--;
    };

    typeObj = multiObj;
  };

  return typeObj;
};


// GET TYPE - CATEGORY: NO DEFAULT
function getNoDefaultCat(type) {
  let typeObj = {}, typeInfo = "";
  let qty = getValue(document.getElementById(`${type}_qty`));
  let shopifyType = document.getElementById(`${type}`).getAttribute('data-shopify-type');
  let typeId = getValue(document.getElementById(`${type}_id`));
  let typeLabel = getValue(document.getElementById(`${type}_label`));

  if (document.getElementById(`${type}_info_exclude`).checked == false) {
    typeInfo = getValue(document.getElementById(`${type}_info`));
  };

  if (typeInfo.length > 0) {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
    typeObj.info = typeInfo;
  }
  else if (typeInfo.length < 1) {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
  };

  if (qty > 1) {
    let multiObj = [];

    while (qty > 0) {
      multiObj.push(typeObj);
      qty--;
    };

    typeObj = multiObj;
  };

  return typeObj;
};


// GET TYPE - CATEGORY: VIDEO
function getVideoCat(type) {
  let typeObj = {}, typeInfo = "", typeDefault = "", options = [];
  let qty = getValue(document.getElementById(`${type}_qty`));
  let shopifyType = document.getElementById(`${type}`).getAttribute('data-shopify-type');
  let typeId = getValue(document.getElementById(`${type}_id`));
  let typeLabel = getValue(document.getElementById(`${type}_label`));

  if (document.getElementById(`${type}_default_exclude`).checked == false) {
    typeDefault = (document.getElementById(`${type}_default`).value.length > 0) ?
    document.getElementById(`${type}_default`).value : "https://www.youtube.com/watch?v=yPYZpwSpKmA";
  };
  
  if (document.getElementById(`${type}_info_exclude`).checked == false) {
    typeInfo = getValue(document.getElementById(`${type}_info`));
  };

  if (document.querySelector(`input[name=${type}-accept]:checked`).value == "YouTube") {
    options.push("youtube");
  };
  
  if (document.querySelector(`input[name=${type}-accept]:checked`).value == "Vimeo") {
    options.push("vimeo");
  };

  if (document.querySelector(`input[name=${type}-accept]:checked`).value == "Both") {
    options.push("youtube", "vimeo");
  };


  if (typeDefault.length < 1 && typeInfo.length < 1) {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
    typeObj.accept = options;
  }
  else if (typeDefault.length > 0 && typeInfo.length > 0) {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
    typeObj.info = typeInfo;
    typeObj.accept = options;
    typeObj.default = typeDefault;
  }
  else if (typeDefault.length > 0  && typeInfo.length < 1) {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
    typeObj.accept = options;
    typeObj.default = typeDefault;
  }
  else if (typeDefault.length < 1  && typeInfo.length > 0) {
    typeObj.type = shopifyType;
    typeObj.id = typeId;
    typeObj.label = typeLabel;
    typeObj.info = typeInfo;
    typeObj.accept = options;
  };


  if (qty > 1) {
    let multiObj = [];

    while (qty > 0) {
      multiObj.push(typeObj);
      qty--;
    };

    typeObj = multiObj;
  };

  return typeObj;
};


// BUILD INDIVIDUAL TYPE
const getType = (type, cat) => {

  let typeData;

  switch (cat) {
    case "standard":

      typeData = getStandardCat(type);
      break;

    case "options":

      typeData = getOptionsCat(type);
      break;

    case "informative":

      typeData = getInformativeCat(type);
      break;

    case "range":

      typeData = getRangeCat(type);
      break;

    case "no-default":

      typeData = getNoDefaultCat(type);
      break;

    case "video":

      typeData = getVideoCat(type);
      break;
  
    default:
      break;
  };

  return document.getElementById("schemaCode").innerHTML = JSON.stringify(typeData, null, 2);
};


// BUILD FULL SCHEMA
const buildFullSchema = schema => {

  const types = document.querySelectorAll('.add-to-schema-checkbox:checked');

  if (types.length < 1) return document.getElementById("schemaCode").innerHTML = "you haven't selected any schema types";

  let schemaSettings = [];

  types.forEach((type, index) => {
    let qty = getValue(document.getElementById(`${type.getAttribute("data-shopify-type")}_qty`));

    if (qty > 1) {
      // this is dynamically calling a function to get the type data
      typeArray = window[`get${type.getAttribute('data-cat')}Cat`](type.getAttribute("data-shopify-type"));
      // then push it into the settings array
      typeArray.forEach(el => schemaSettings.push(el));
    }
    else {
      schemaSettings.push(window[`get${type.getAttribute('data-cat')}Cat`](type.getAttribute("data-shopify-type")));
    };
  });

  return getSchema(schema, schemaSettings);
};