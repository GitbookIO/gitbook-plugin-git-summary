const GitBook = require('gitbook-core');
const { React } = GitBook;

const GitAuthor = require('./GitAuthor');

const GitSummary = React.createClass({
    propTypes: {
        page:   GitBook.PropTypes.Page,
        github: React.PropTypes.string
    },

    render() {
        const { page, github } = this.props;
        const gitSummary = page.attributes.get('gitSummary');

        const sha     = gitSummary.get('sha');
        const message = gitSummary.get('message');
        const authors = gitSummary.get('authors').toJS();
        const date    = new Date(gitSummary.get('date'));

        const commitURL = github ? `${github}/commit/${sha}` : '#';

        return (
            <GitBook.Panel className="GitSummary-Container">
                <GitBook.ImportCSS href="gitbook/git-summary/plugin.css" />

                <GitBook.FlexLayout className="Toolbar">
                    <GitBook.FlexBox className="GitSummary-Authors">
                        {authors.map(author => <GitAuthor key={author.email} author={author} />)}
                    </GitBook.FlexBox>
                    <GitBook.FlexBox auto>
                        <div className="GitSummary-Message">
                            <a href={commitURL} target="_blank">{message}</a>
                            {' on '}
                            <b>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</b>
                        </div>
                    </GitBook.FlexBox>
                </GitBook.FlexLayout>
            </GitBook.Panel>
        );
    }
});


module.exports = GitBook.connect(GitSummary, ({ config }) => {
    return { github: config.get('github') };
});
