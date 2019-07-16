module.exports = {
    number: function (min, max, precision) {
        if (!precision) {
            min = Math.ceil(min)
            max = Math.floor(max)
        
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
        return ((Math.random() * (max - min + 1)) + min).toFixed(2)
    },
    date: function (start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        
    }
}