import { Point, ChartDataset } from "chart.js";
import Color from "color";

export function Dataset(data:Point[], {label = '', colour = Color("red")} = {}): ChartDataset {
    return {
        label:label,
        borderColor:colour.toString(),
        fill:false,
        showLine:true,
        data:data,
        cubicInterpolationMode: "monotone"
    }
}
