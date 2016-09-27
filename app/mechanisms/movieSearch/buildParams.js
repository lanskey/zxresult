import Chance from 'chance';
import _ from 'lodash';
import { apiUrl, apiKey } from 'containers/App/constants';

// Add each param to url
function rescueValue(parameter, arr = []) {
  const tempArray = arr;
  _.each(parameter, (extractedApiParam, key) => {
    if (_.isObject(extractedApiParam)) rescueParam(extractedApiParam, tempArray, parameter); // find nested
    // push 'extractedApiParam' which seem to be api param, we just have to extract a extractedApiParam for our apiParam
    else tempArray.push({ [extractedApiParam]: key }); // TODO: value for our extractedApiParam
  });
  return tempArray;
}

// Add each param to url
function rescueParam(parameter, arr = []) {
  const tempArray = arr;
  _.each(parameter, (extractedApiParam, key) => {
    if (_.isObject(extractedApiParam)) rescueParam(extractedApiParam, tempArray, parameter); // find nested
    // push 'extractedApiParam' which seem to be api param, we just have to extract a extractedApiParam for our apiParam
    else tempArray.push({ [extractedApiParam]: key }); // TODO: value for our extractedApiParam
  });
  return tempArray;
}

function attachParams(filters, baseUrl) {
  let newUrl = baseUrl;
  console.clear();

  // Run for each filter (genre, decade, trend)
  Object.keys(filters).forEach((key) => {
    // Extract param
    let filterParam = filters[key].apiParam;
    // check if it's an object, and get an arr of each params with their key, value.
    if (_.isObject(filterParam)) filterParam = rescueParam(filterParam);

    console.log(filters, filterParam);
    // newUrl += `&${key}=${params[key]}`;
  });
  console.log(newUrl);
  return newUrl;
}

// Build url with params
export function buildUrlParams(filters, endpoint) {
  let baseUrl = `${apiUrl}${endpoint}?${apiKey}`;
  if (filters) baseUrl = attachParams(filters, baseUrl);
  return baseUrl;
}

// Randomize page depending on max resultRange
export function randomizePage(storeParams) {
  const maxRange = storeParams.range.pages > 1000 ? 1000 : storeParams.range.pages;
  const maxPage = storeParams.range.pages ? maxRange : 1;

  const chance = new Chance();
  // FIXME: There is an issue with defining a default value, when the user first time come to website.
  return chance.integer({ min: 1, max: maxPage });
}


function defineParams(storeParams) {
  const randomPage = storeParams.range.pages ? randomizePage(storeParams) : null;
  const { genre, decade, trend } = storeParams;
  let schema = { storeParams };
  schema.newly = schema.newly || {};


  const paramKeys = Object.keys(storeParams).filter((key) => storeParams[key].active);

  _.each(paramKeys, key => {
    let value = schema.storeParams[key].active;
    let apiParam = schema.storeParams[key].apiParamName;

    Object.assign(schema.newly, { [key]: { value, apiParam } });
  });



  return schema.newly;
}

function prepareParams(storeParams) {
  // Define possible query and check if appropriate option exist, so we could use their options
  const prepared = defineParams(storeParams);

  // const getParams = renameParamsToApiKeys(prepared);

  // Remove null keys so they won't be used in our url
  Object.keys(prepared).forEach((key) => {
    if (!prepared[key]) delete prepared[key];
  });

  return prepared;
}

function assignHigherParams(params, higherParams) {
  Object.assign(params, higherParams);
}

export function validateAndPrepareParams(storeParams, higherParams) {
  const params = prepareParams(storeParams);
  // Merge params & higherParams
  assignHigherParams(params, higherParams);
  return params;
}