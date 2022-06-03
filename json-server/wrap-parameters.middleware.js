module.exports = (req, res, next) => {
  if (req.method === 'POST') {
    // Reformat to match wrap parameters if needed
    if (req.body['pv_mise_en_service']) {
      req.body = req.body['pv_mise_en_service'];
    }

    const today = new Date().toISOString();
    req.body['created_at'] = today;
    req.body['updated_at'] = today;
    req.body['company_id'] = 1;
    req.body['customer_id'] = 1;
    req.body['solar_panels'] = req.body['solar_panels_attributes'].map((v, k) => ({
      "id": k+1,
      "type_of": v['type_of'] === 0? 'photovoltaic' : 'hybrid',
      "serial_number": v['serial_number'],
      "created_at": today,
      "updated_at": today
    }))

    // Clean up nested attributes
    req.body['company_attributes'] = undefined;
    req.body['customer_attributes'] = undefined;
    req.body['solar_panels_attributes'] = undefined;
  }
  next()
}
