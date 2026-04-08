export interface ScheduleItem {
	id: number;
	day_date: string;
	start_time: string;
	duration_minutes: number;
	class_name: object;
	level: string;
	instructor_id: number;
	category: string;
	comment: object;
	price: number;

	// Left-joined fields
	instructors: number[];
	instructors_data: object[];
	day_of_week: number;
};

export interface ScheduleItemTmr extends ScheduleItem {
	is_tomorrow: boolean;
}
