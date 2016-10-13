const GitBook = require('gitbook-core');
const { React } = GitBook;

const GitAuthor = React.createClass({
    propTypes: {
        author: React.PropTypes.object,
        github: React.PropTypes.string
    },

    render() {
        const { author, github } = this.props;

        const url = github ? `${github}/commits/?author=${encodeURIComponent(author.email)}` : '#';

        return (
            <a className="GitSummary-Author" href={url} target="_blank">
                <GitBook.Tooltipped title={author.name}>
                    <img src={author.avatar} />
                </GitBook.Tooltipped>
            </a>
        );
    }
});

module.exports = GitBook.connect(GitAuthor, ({ config }) => {
    return { github: config.get('github') };
});
