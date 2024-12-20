
import { render, screen } from "@testing-library/react";
import HourlyTemperatureChart from "../components/HourlyTemperatureChart/HourlyTemperatureChart";

describe("HourlyTemperatureChart", () => {
  const mockLabels = ["12 AM", "1 AM", "2 AM"];
  const mockData = [22, 21, 20];

  it("renders without crashing", () => {
    render(
      <HourlyTemperatureChart labels={mockLabels} hourlyData={mockData} />
    );

    // Проверка, что компоненты отображаются
    expect(screen.getByText("12 AM")).toBeInTheDocument();
    expect(screen.getByText("1 AM")).toBeInTheDocument();
    expect(screen.getByText("2 AM")).toBeInTheDocument();
  });

  it("displays correct temperature values", () => {
    render(
      <HourlyTemperatureChart labels={mockLabels} hourlyData={mockData} />
    );

    // Проверка температуры
    expect(screen.getByText("22°C")).toBeInTheDocument();
    expect(screen.getByText("21°C")).toBeInTheDocument();
    expect(screen.getByText("20°C")).toBeInTheDocument();
  });
});
