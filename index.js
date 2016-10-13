/* eslint-disable no-var, object-shorthand */
var Q = require('q');
var Git = require('simple-git');

function getAuthor(commit) {
    return {
        name: commit.author_name,
        email: commit.author_email
    };
}

module.exports = {
    hooks: {

        /*
            For each page, we list commits and extract infos.
         */
        page: function(page) {
            var d = Q.defer();
            var repo = Git(this.root());

            repo.log({
                file: page.rawPath
            }, function(err, commits) {
                if (err) {
                    return d.reject(err);
                }

                d.resolve(
                    page.setAttribute('gitSummary', {
                        sha:     commits.latest.hash,
                        date:    commits.latest.date,
                        message: commits.latest.message,
                        authors: commits.all.map(getAuthor)
                    })
                );

                d.resolve(page);
            });

            return d.promise;
        }
    }
};
