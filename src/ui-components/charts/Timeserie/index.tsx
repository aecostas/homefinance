import { ECharts, getInstanceByDom, init } from "echarts";
import { useEffect, useRef } from "react";

interface TimeData {
    t: number,
    value: number,
}

interface Props {
    series: TimeData[]
}

const Timeserie = ({series}: Props) => {
    const chartRef = useRef<HTMLDivElement>(null);


    const options = {
        title: {
          text: 'Dynamic Data & Time Axis'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params:any) {
            params = params[0];
            var date = new Date(params.name);
            return (
              date.getDate() +
              '/' +
              (date.getMonth() + 1) +
              '/' +
              date.getFullYear() +
              ' : ' +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            showSymbol: false,
            data: series.map(item => ({name: 'xxx', value:[item.t, item.value]}))
          }
        ]
      };


      useEffect(() => {
        // Initialize chart
        let chart: ECharts | undefined;
        
        if ((chartRef as any).current !== null) {
          chart = init((chartRef as any).current);
        }
    
        // Add chart resize listener
        // ResizeObserver is leading to a bit janky UX
        function resizeChart() {
          chart?.resize();
        }
        window.addEventListener('resize', resizeChart);
    
        // Return cleanup function
        return () => {
          chart?.dispose();
          window.removeEventListener('resize', resizeChart);
        };
      }, []);
    
    useEffect(() => {
        // Update chart
        if ((chartRef as any).current !== null) {
          const chart = getInstanceByDom((chartRef as any).current);


          chart?.setOption(options, {});
        }
      }, [options, chartRef, chartRef.current]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function
    
    
    return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
}

export default Timeserie