var width = 700;
var height = 700;
var color = d3.scale.category10();

var svg = d3.select('body').append('svg');

svg
	.attr('width', width)
	.attr('height', height);

var cola = cola.d3adaptor();

cola
	.linkDistance(70)
	.size([width, height]);

var dragstart = function (d) {
	d3.select(this).classed("fixed", d.fixed = true);
}

var dblclick = function (d) {
  	d3.select(this).classed("fixed", d.fixed = false);
}

var drag = cola.drag()
	.on("dragstart", dragstart);

d3.json('graph.json', function (error,graph) {
	cola
		.nodes(graph.nodes)
		.links(graph.links)
		.start();

	var links = svg.selectAll('.link')
		.data(graph.links)
		.enter()
		.append('line')
		.attr('class','link')
		.attr('stroke', 'black')
		.attr('stroke-width', 2)

	var nodes = svg.selectAll('.node')
		.data(graph.nodes)
		.enter()
		.append('circle')
		.attr('class','node')
		.attr('r', 10)
		.attr('fill', function (d) { return color(d.isOrg); })
		.on('dblclick', dblclick)
		.call(drag);

	var tick = function(){
		nodes
			.attr('cx', function (d) { return d.x; })
			.attr('cy', function (d) { return d.y; });

		links.attr("x1", function (d) { return d.source.x; })
	        .attr("y1", function (d) { return d.source.y; })
	        .attr("x2", function (d) { return d.target.x; })
	        .attr("y2", function (d) { return d.target.y; });
	};

	cola.on('tick', tick);
});