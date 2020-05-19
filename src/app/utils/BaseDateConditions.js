exports.base_date_condition = function(condition, date_condition) {
    const date = new Date();
    if (condition) {
        dateCondition = new Date(date_condition);
        initdate = `'${dateCondition.getDay()}/${dateCondition.getMonth()+1}/${dateCondition.getFullYear()}'`
    } else {
        initdate = `'1/1/${date.getFullYear()}'`
    }
    return initdate;
};