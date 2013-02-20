/**
 * Executes the given function fn with each node that match the given selector.
 * @param {String} selector
 * @param {Function} fn
 */
function forEach(selector, fn) {
    var nodeList = document.querySelectorAll(selector);
    for (var i = 0, length = nodeList.length; i < length; i++) {
        fn(nodeList[i]);
    }
}

/**
 * Changes the visibility for each node that match the given selector.
 * @param {!String} selector
 * @param {!Boolean} isVisible
 */
function SetNodesVisibility(selector, isVisible) {
    var value = isVisible ? "block" : "none";
    forEach(selector, function (node) {
        node.style.display = value;
    });
}

/**
 * Returns the selector corresponding to the given tag.
 * @param {String} tag
 * @returns {string}
 */
function getTagSelector(tag) {
    return 'article.tag-' + tag;
}

/**
 * Shows the clear filter button for the given tag.
 * @param tag
 */
function showClearFilterBtn(tag) {
    forEach(".clear-filter-text", function (node) {
        node.innerText = "filter on " + tag;
    });
    SetNodesVisibility(".clear-filter", true);
}

/**
 * Hides the clear filter button.
 */
function hideClearFilterBtn() {
    SetNodesVisibility(".clear-filter", false);
}

/**
 * Caches the last filter used.
 * @type {String}
 */
var lastFilter = null;

/**
 * Shows only the articles containing the given tag and hides the others.
 * @param {String} tag
 */
function setFilterTag(tag) {
    if (!tag) { return; }
    var tagSelector = getTagSelector(tag);

    if (lastFilter) {
        // Hide articles with the lastFilter tag
        SetNodesVisibility(lastFilter, false);
        // Show articles with the given tag
        SetNodesVisibility(tagSelector, true);
    } else {
        // Hide all articles without the given tag
        SetNodesVisibility("article:not(.tag-" + tag + ")", false);
    }
    // cache the tag in lastFilter
    lastFilter = tagSelector;
    updateSectionsVisibility(tagSelector);
    showClearFilterBtn(tag);
}

/**
 * Extracts the tag from the href attribute of the given node and filters by this tag.
 * @param node Markup of type <a>
 */
function filter(node) {
    var tag = node.hash.substr(1);
    setFilterTag(tag);
}

/**
 * Stops filtering and shows all articles.
 */
function clearFilterTag() {
    lastFilter = null;
    hideClearFilterBtn();
    // Show all articles
    SetNodesVisibility("article", true);
    // Show all sections
    SetNodesVisibility("section", true);
}

/**
 * For each section, hides it if it doesn't contain an article with the given tag,
 * otherwise shows it.
 * @param {String} tagSelector
 */
function updateSectionsVisibility(tagSelector) {
    forEach('section', function (node) {
        var articles = node.querySelectorAll(tagSelector);
        if (articles.length > 0) {
            node.style.display = 'block';
        } else {
            node.style.display = 'none';
        }
    });
}

/**
 * Filters the articles in the page if there is a tag in the current url anchor.
 * Otherwise shows all.
 */
function updateFilterWithCurrentHash() {
    var hash = window.location.hash;
    if (hash) {
        var tag = hash.substr(1);
        setFilterTag(tag);
    } else {
        clearFilterTag();
    }
    window.scrollTo(0, 0);
}

// Update the filter when the anchor in the url changes
window.onhashchange = function () {
    updateFilterWithCurrentHash();
}

// Update the filter when the page is loaded
window.addEventListener('DOMContentLoaded', function() {
    updateFilterWithCurrentHash();
}, false);