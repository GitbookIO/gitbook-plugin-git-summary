/* eslint-disable no-var, object-shorthand */
var Q = require('q');
var uniq = require('uniq');
var Git = require('simple-git');
var gravatar = require('gravatar');

function getAuthor(commit) {
    return {
        name:   commit.author_name,
        email:  commit.author_email,
        avatar: gravatar.url(commit.author_email, { protocol: 'https' })
    };
}

function compareAuthor(a, b) {
    return a.email === b.email ? 0 : 1;
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
                        authors: uniq(commits.all.map(getAuthor), compareAuthor)
                    })
                );

                d.resolve(page);
            });

            return d.promise;
        }
    }
};
