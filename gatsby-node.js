exports.onCreatePage = async ({ page, actions }) => {
	const { createPage } = actions;

	if (page.path.match(/^\/bookmark/)) page.matchPath = '/bookmark/*';
	createPage(page);
};
