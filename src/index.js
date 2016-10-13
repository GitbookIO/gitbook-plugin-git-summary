const GitBook = require('gitbook-core');
const GitSummary = require('./components/GitSummary');

module.exports = GitBook.createPlugin({
    activate: (dispatch, getState, { Components }) => {
        dispatch(Components.registerComponent(GitSummary, { role: 'page:footer' }));
    }
});
