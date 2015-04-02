describe('resource testing', function() {
	it('should pass now', function() {
		var result = 'mike erickson';
		expect(result).toBe('mike erickson');
	});

	it('should now fail', function(){
		var result = 'erickson mike';
		expect(result).toBe('erickson mike');
	});
});