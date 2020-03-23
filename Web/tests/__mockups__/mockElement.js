let mockElement = tagName => {
	return {
		tagName: tagName.toUpperCase(),
		addEventListener: () => {},
		removeEventListener: () => {}
	};
};

module.exports = mockElement;