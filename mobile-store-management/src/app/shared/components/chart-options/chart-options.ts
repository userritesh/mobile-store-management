import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart-options',
  templateUrl: './chart-options.html',
  styleUrls: ['./chart-options.scss'],
})
export class ChartOptionsComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;

  public barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { data: [45, 37, 60, 70, 46, 33], label: 'Sales', backgroundColor: 'rgba(54,162,235,0.5)' },
      { data: [30, 45, 40, 50, 60, 55], label: 'Revenue', backgroundColor: 'rgba(255,99,132,0.5)' }
    ]
  };

  public barChartOptions = {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  };

  ngAfterViewInit(): void {
    new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: this.barChartData,
      options: this.barChartOptions
    });
  }
}
