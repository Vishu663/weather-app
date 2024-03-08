import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const weekDays = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

export default function Forecast({ forecast }) {
	const daysInAWeek = new Date().getDay();
	const forecastDays = weekDays
		.slice(daysInAWeek, weekDays.length)
		.concat(weekDays.slice(0, daysInAWeek));

	return (
		<>
			<label className="title">Forecast</label>
			<Accordion allowZeroExpanded>
				{forecast.list.slice(0, 7).map((item, idx) => (
					<AccordionItem key={idx}>
						<AccordionItemHeading>
							<AccordionItemButton>
								<div className="daily-item">
									<img
										className="small-icon"
										src={require(`../../assets/icons/${item.weather[0].icon}.png`)}
										alt="img"
									/>
									<label>{forecastDays[idx]}</label>
									<div className="description">
										{item.weather[0]?.description}
									</div>
									<div className="max-min">
										{item.main.temp_max},{item.main.temp_min}
									</div>
								</div>
							</AccordionItemButton>
						</AccordionItemHeading>
						<AccordionItemPanel>
							<div className="daily-details-grid">
								<div className="daily-details-grid-item">
									<label>Pressure:</label>
									<label>{item.main.pressure}</label>
								</div>
								<div className="daily-details-grid-item">
									<label>Humidity:</label>
									<label>{item.main.humidity}</label>
								</div>
								<div className="daily-details-grid-item">
									<label>Clouds:</label>
									<label>{item.clouds.all}%</label>
								</div>
								<div className="daily-details-grid-item">
									<label>Wind speed:</label>
									<label>{item.wind.speed} m/s</label>
								</div>
								<div className="daily-details-grid-item">
									<label>Sea level:</label>
									<label>{item.main.sea_level}m</label>
								</div>
								<div className="daily-details-grid-item">
									<label>Feels like:</label>
									<label>{item.main.feels_like}°C</label>
								</div>
							</div>
						</AccordionItemPanel>
					</AccordionItem>
				))}
			</Accordion>
		</>
	);
}
