exports.base_date_condition = function(condition, date_condition) {
    const year = new Date().getFullYear();
    initdate = `'1/1/${year}'`
    return condition ? date_condition : initdate;
};