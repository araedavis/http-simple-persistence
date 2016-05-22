class Router {
	constructor () {
		this.methods = {
			GET: [],
			POST: []
		};
	}

	get( url, handler ) {
		this.methods.GET.push({ url, handler });
		return this;
	}

	post( url, handler ) {
		this.methods.POST.push( { url, handler } );
		return this;
	}

	routes(){

		return ( req, res ) => {
			const routes = this.methods[ req.method ];
			if ( routes ) {
				const route = routes.find( r => req.url.indexOf( r.url ) === 0 );
				if ( route ) {
					route.handler( req, res );
					return;
				}
			}

			res.writeHead(404);
			res.write('not found');
			res.end();

		};
	}
}

module.exports = function() {
	return new Router();
};
