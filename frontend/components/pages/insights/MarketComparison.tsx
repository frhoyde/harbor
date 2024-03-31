"use client";
import ViewDetails from "@/components/shared/ViewDetails";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  ChartData,
  ChartOptions,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const labelMap: {
  "Public Storage": string;
  "Prime Storage": string;
  StorPlace: string;
  UHaul: string;
} = {
  "Public Storage": "/storage/company/1.png",
  "Prime Storage": "/storage/company/2.png",
  StorPlace: "/storage/company/3.png",
  UHaul: "/storage/company/4.png",
};

export const data: ChartData<"doughnut"> = {
  labels: ["Public Storage", "Prime Storage", "StorPlace", "UHaul"],
  datasets: [
    {
      label: "Price",
      data: [897, 397, 220, 97],
      backgroundColor: ["#38B6FF", "#00BF63", "#FF66C4", "#8C52FF"],
    },
  ],
};
const imageCache = {};

const doughnutLabelsLine = {
  id: "doughnutLabelsLine",
  afterDraw(chart, args, options) {
    const {
      ctx,
      data,
      chartArea: { top, bottom, left, right, width, height },
    } = chart;
    ctx.save();
    data.datasets[0].data.forEach((dataPoint, index) => {
      const { x, y } = chart.getDatasetMeta(0).data[index].tooltipPosition();

      const halfWidth = width / 2;
      const halfHeight = height / 2;

      const xLine = x > halfWidth ? x - 10 : x - 20;
      const yLine = y > halfHeight ? y + 30 : y - 20;
      const extraLine = x > halfWidth ? 10 : -10;
      //   ctx.beginPath();
      //   ctx.moveTo(x, y);
      //   ctx.lineTo(xLine, yLine);
      //   ctx.lineTo(xLine + extraLine, yLine);
      //   ctx.strokeStyle = data.datasets[0].backgroundColor[index];
      //   ctx.strokeStyle = "#000";
      //   ctx.stroke();
      //   const textWitdh = ctx.measureText(data.labels[index]).width;
      //   const textPostion = x >= halfWidth ? xLine + "left" : "right";
      //   ctx.textAlign = textPostion;
      //   ctx.font = "12px Arial";
      //   ctx.textBaseline = "middle";
      //   ctx.fillText(data.labels[index], xLine + extraLine, yLine);

      const imgSrc = labelMap[data.labels[index]];
      if (imageCache[imgSrc]) {
        ctx.drawImage(imageCache[imgSrc], xLine, yLine, 30, 15);
      } else {
        const img = new Image();
        img.src = imgSrc;
        img.onload = function () {
          imageCache[imgSrc] = img;
          ctx.drawImage(img, xLine, yLine, 30, 15);
        };
      }
    });
  },
};

const options: ChartOptions<"doughnut"> = {
  layout: {
    padding: 10,
  },
  responsive: true,
  plugins: {
    tooltip: {
      enabled: false,
      intersect: false,
      callbacks: {
        label: function (context) {
          return ` $${context.parsed}K USD`;
        },
      },
      external: function (context) {
        var tooltipModel = context.tooltip;

        //   // Tooltip Element
        //   var tooltipEl = document.getElementById("chartjs-tooltip");

        //   // Create element on first render
        //   if (!tooltipEl) {
        //     tooltipEl = document.createElement("div");
        //     tooltipEl.id = "chartjs-tooltip";
        //     tooltipEl.innerHTML = "<table></table>";
        //     // tooltipEl.classList.add("scrollbar");
        //     document.body.appendChild(tooltipEl);
        //   }

        //   function getBody(bodyItem) {
        //     return bodyItem.lines;
        //   }

        //   // Set Text
        //   if (tooltipModel.body) {
        //     var titleLines = tooltipModel.title || [];
        //     var bodyLines = tooltipModel.body.map(getBody);

        //     var innerHtml = "<thead>";

        //     titleLines.forEach(function (title) {
        //       innerHtml += "<tr><th>" + title + "</th></tr>";
        //     });
        //     innerHtml += "</thead><tbody >";

        //     bodyLines.forEach(function (body, i) {
        //       var colors = tooltipModel.labelColors[i];
        //       var style = "background:" + colors.backgroundColor;
        //       style += "; border-color:" + colors.borderColor;
        //       style += "; border-width: 2px !important";
        //       style += "; width: 10px !important";
        //       style += "; height: 10px !important";
        //       style += "; display: inline-block !important";
        //       style += "; margin-right: 3px !important";
        //       var box = `<span style="${style}"></span>`;
        //       innerHtml += `<tr><td>${box}${body}</td></tr>`;
        //     });
        //     innerHtml += "</tbody>";

        //     var tableRoot = tooltipEl.querySelector("table");
        //     tableRoot.innerHTML = innerHtml;
        //   }

        //   // `this` will be the overall tooltip
        //   var position = this.chart.canvas.getBoundingClientRect();

        //   // Display, position, and set styles for font
        //   tooltipEl.style.opacity = 1;
        //   tooltipEl.style.position = "absolute";
        //   tooltipEl.style.left =
        //     position.left + window.pageXOffset + tooltipModel.caretX + "px";
        //   tooltipEl.style.top =
        //     position.top + window.pageYOffset + tooltipModel.caretY + "px";
        //   tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
        //   tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
        //   tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
        //   tooltipEl.style.padding =
        //     tooltipModel.yPadding + "px " + tooltipModel.xPadding + "px";
        //   // tooltipEl.style.pointerEvents = 'none'; // Use when need to stop mouse events such as Onhover and Scrolling
        //   tooltipEl.style.borderColor = "blue";
        //   tooltipEl.style.borderRadius = "4px";
        //   tooltipEl.style.backgroundColor = "white";
        //   tooltipEl.style.maxHeight = "100px";
        //   tooltipEl.style.overflowY = "auto";
        //   tooltipEl.style.scrollBehavior = "smooth";
      },
    },
  },
};
const MarketComparison = () => {
  return (
    <div className="card">
      <h2>Market Comparison</h2>
      <div className="mt-4 grid grid-cols-12 gap-2 items-center">
        <div className="relative col-span-6 ">
          <Doughnut
            data={data}
            options={options}
            plugins={[doughnutLabelsLine]}
          />
          <p className="text-xs absolute top-1/2 left-1/2 z-10 font-bold -translate-x-1/2 -translate-y-1/2 w-10 text-center">
            Market share
          </p>
        </div>
        <div className="col-span-6">
          <h3 className="text-center">Total sales per facility</h3>
          <ul>
            <li className="p-1 flex text-xs justify-between border-b text-green-500">
              <span>1st</span>
              <span>
                <img
                  alt="1"
                  src="/storage/company/1.png"
                  width={30}
                  height={15}
                />
              </span>
              <span>$897K USD</span>
            </li>
            <li className="p-1 flex text-xs justify-between border-b">
              <span>2nd</span>
              <span>
                <img
                  alt="2"
                  src="/storage/company/2.png"
                  width={30}
                  height={15}
                />
              </span>
              <span>$397K USD</span>
            </li>
            <li className="p-1 flex text-xs justify-between border-b">
              <span>3rd</span>
              <span>
                <img
                  alt="3"
                  src="/storage/company/3.png"
                  width={30}
                  height={15}
                />
              </span>
              <span>$220K USD</span>
            </li>
            <li className="p-1 flex text-xs justify-between border-b">
              <span>4th</span>
              <span>
                <img
                  alt="4"
                  src="/storage/company/4.png"
                  width={30}
                  height={15}
                />
              </span>
              <span>$97K USD</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-end">
        <ViewDetails href="#" />
      </div>
    </div>
  );
};

export default MarketComparison;
