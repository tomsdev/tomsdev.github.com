var helper_utils = require("punch").Utils.Helper;

var block_helpers = {
    /**
     * Returns the given text parsed. It replaces the tags in the given text in the
     * form @@tag and @@tag:text with an html link.
     * @returns {String}
     */
    parse_tags: function() {
        return helper_utils.checkArgs(arguments, function(text) {
            if(!text) {
                return "";
            }
//            // replace format @@web:Website
//            var result = text.replace(/@@([a-z]*):([a-z-]*)/gi, "<a class='tag' href='#$1'>$2</a>");
//            // replace format @@web
//            return result.replace(/@@([a-z-]*)/gi, "<a class='tag' href='#$1'>$1</a>");

            // replace format @@web:Website
            var result = text.replace(/@@([a-z]*):([a-z-]*)/gi, "<span class='tag'>$2</span>");
            // replace format @@web
            return result.replace(/@@([a-z-]*)/gi, "<span class='tag'>$1</span>");
        });
    },

    /**
     * Returns a class attribute containing all the tags present in the given text.
     * Note: the classes are in the form tag-web, tag-mobile, etc.
     * @returns {String}
     */
    extract_tags_classes: function() {
        return helper_utils.checkArgs(arguments, function(text) {
            if(!text) {
                return "";
            }

            var regExp = /@@([a-z-]*)/gi;
            var tags = [];

            while ((match = regExp.exec(text)) !== null) {
                tags.push('tag-' + match[1]);
            }

            if (tags.length > 0) {
                var classes = tags.join(' ');
                return "class='" + classes + "'";
            }
            return "";
        });
    }
};

module.exports = {

    directAccess: function(){
        return { "block_helpers": block_helpers, "options": {} };
    },

    get: function(basepath, file_extension, options, callback){
        var self = this;

        return callback(null, { "block": block_helpers }, {});
    }

};