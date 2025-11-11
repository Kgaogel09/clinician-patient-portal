'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { HealthMetric } from '@/types/types';

interface TimeSeriesChartProps {
    data: HealthMetric[];
    metric: 'heartRate' | 'sleep' | 'steps' | 'systolic' | 'diastolic';
    width?: number;
    height?: number;
    margin?: { top: number; right: number; bottom: number; left: number };
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
    data,
    metric,
    width = 800,
    height = 400,
    margin = { top: 20, right: 30, bottom: 30, left: 40 }
}) => {
    const svgRef = useRef<SVGSVGElement>(null);



    useEffect(() => {
        if (!svgRef.current || !data.length) return;

        // Clear previous chart
        d3.select(svgRef.current).selectAll('*').remove();

        // Set up dimensions
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Create SVG
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Helper function to get metric value
        const getMetricValue = (d: HealthMetric) => {
            switch (metric) {
                case 'heartRate': return d.heartRate;
                case 'sleep': return d.sleep;
                case 'steps': return d.steps;
                case 'systolic': return d.bloodPressure.systolic;
                case 'diastolic': return d.bloodPressure.diastolic;
                default: return 0;
            }
        };

        // Set up scales
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => new Date(d.date)) as [Date, Date])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => getMetricValue(d)) as number])
            .nice()
            .range([innerHeight, 0]);

        // Create line generator
        const line = d3.line<HealthMetric>()
            .x(d => xScale(new Date(d.date)))
            .y(d => yScale(getMetricValue(d)))
            .curve(d3.curveMonotoneX);

        const tooltip = d3.select('body')
            .append('div')
            .attr('class', 'chart-tooltip')
            .style('position', 'absolute')
            .style('background', 'white')
            .style('padding', '8px')
            .style('border', '1px solid #ccc')
            .style('border-radius', '4px')
            .style('pointer-events', 'none')
            .style('opacity', 0)
            .style('color', '#000');

        // Add X axis
        svg.append('g')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale)
                .ticks(Math.min(data.length, 21))
                .tickFormat((d) => d3.timeFormat('%b %d')(d as Date))
            )
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');

        // Add Y axis
        svg.append('g')
            .call(d3.axisLeft(yScale));

        // Add grid lines
        svg.append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale)
                .tickSize(-innerHeight)
                .tickFormat(() => '')
            )
            .style('stroke-dasharray', '3,3')
            .style('opacity', 0.2);

        svg.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft(yScale)
                .tickSize(-innerWidth)
                .tickFormat(() => '')
            )
            .style('stroke-dasharray', '3,3')
            .style('opacity', 0.2);

        // Add the line
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('d', line);

        // Add dots for data points
        svg.selectAll('.dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('cx', d => xScale(new Date(d.date)))
            .attr('cy', d => yScale(getMetricValue(d)))
            .attr('r', 3)
            .attr('fill', 'steelblue')
            .on('mouseover', function (event, d) {
                tooltip
                    .html(`Date: ${d.date}<br/>Value: ${getMetricValue(d)}`)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 10) + 'px')
                    .style('opacity', 1);
            })
            .on('mouseout', function () {
                tooltip.style('opacity', 0);
            });

        // Add chart title
        svg.append('text')
            .attr('x', innerWidth / 2)
            .attr('y', -5)
            .attr('text-anchor', 'middle')
            .attr('class', 'fill-black dark:fill-white')
            .style('font-size', '14px')
            .text(' Time Series Chart - ' + metric.charAt(0).toUpperCase() + metric.slice(1));

        return () => {
            d3.selectAll('.chart-tooltip').remove();
        };

    }, [data, metric, width, height, margin]);

    if (!data.length) {
        return <div className="text-center py-8 text-gray-500">No data available</div>;
    }

    return (
        <div className="time-series-chart">
            <svg ref={svgRef} role="img"
                aria-label={`Time series chart showing ${metric} over time`}></svg>
        </div>
    );
};

export default TimeSeriesChart;