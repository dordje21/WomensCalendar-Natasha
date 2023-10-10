![Screenshots of Natasha](https://github.com/dordje21/WomensCalendar-Natasha/blob/main/PicsForGithub/ScreensPicture.png)

# 🌺 WomensCalendar-Natasha

WomensCalendar-Natasha is a 🥼 women's period and ovulation tracker app functioning as a mini app on Telegram 📲. It allows users to keep track of their menstruation cycle 📅 and predict ovulation dates, all through a user-friendly 👩‍💻 and intuitive interface. There are also some funny advices from bot natasha in main page

## 🔎 Features

1. **📝 Personalized Questions Page:** To begin, you will be asked a few simple questions about your cycle lengths to ensure accurate tracking and predictions.
2. **🗓 Main Page Overview:** The main page provides a brief overview of the next 5 days and the previous 2 days' history of your period or ovulation.
3. **📆 Second page Calendar:** The app features a scrollable calendar for a comprehensive view of monthly data.
4. **🌈 Dynamic Themes:** The app fetches the Telegram WebApp info to adapt our app's background color and text to the user's default colors.

## 📚 Database

We have employed Telegram's CloudStorage as our database, providing reliable and seamless data storage and retrieval.

## ⚙ Local Installation

Follow these steps to run the WomensCalendar-Natasha app locally:

1. Clone this repository to your local machine.
    ```
    git clone https://github.com/dordje21/WomensCalendar-Natasha.git   
    ```

2. Navigate to the project directory
    ```
    cd WomensCalendar-Natasha
    ```

3. Install all the required dependencies with NPM
    ```
    npm install
    ```

4. Run the app in development mode
    ```
    npm run dev
    ```

☝ Now, WomensCalendar-Natasha should be running at `localhost:3000` (or whatever port you specified).

Make sure you have Node.js and npm installed on your local machine. If you do not, you can install them from [here](https://nodejs.org/).

## 🚀 Our clickable example

You can check our web app here - https://t.me/NatashaCalendarBot/CalendarApp

## 🔒 License

We are using MIT license, so you are free to use our code

## 👥 Made by
Aleksis Kvjatkovskis 🇱🇻  and
Michael Lytvyn 🇺🇦


# Info About Components :

## DatePickerCal Component

The `DatePickerCal` component is a React component used to display a date picker interface that allows users to select a date. This component makes use of several external libraries and components to create a smooth user experience.

## Dependencies

This component depends on the following libraries and components:

- **@bjarkehs/react-nice-dates**: This library is used to create the date picker interface.
- **@bjarkehs/react-nice-dates/build/style.css**: The CSS file from the same library is imported to style the date picker.
- **date-fns/locale**: The `enGB` locale from the `date-fns` library is used to configure the date picker to display dates in English (Great Britain) format.
- **framer-motion**: This library is used to add animations to the component, creating a smooth and visually pleasing user experience.

## Props

The `DatePickerCal` component accepts the following props:

- `selectedValue`: A function to handle the selected date value.
- `question`: A string representing a question or prompt to display above the date picker.
- `saveData`: A function to handle saving the selected date.

## Component Structure

The component's structure can be broken down into the following parts:

1. **State Management**: The component uses React's `useState` hook to manage the selected date (`date`).

2. **handleChange Function**: The `handleChange` function is responsible for updating the `date` state when a new date is selected. It also calls the `selectedValue` function with the new value.


# CalendarMi Component

The `CalendarMi` component is a React component that displays a calendar with specific date markers, such as menstruation and ovulation dates. This component relies on several external libraries and components for its functionality and visual appearance.

## Dependencies

This component depends on the following libraries and components:

- **@bjarkehs/react-nice-dates**: This library is used to create the calendar interface.
- **@bjarkehs/react-nice-dates/build/style.css**: The CSS file from the same library is imported to style the calendar.
- **date-fns**: The `date-fns` library is used for date manipulation and comparison, as well as to configure the calendar's locale.
- **framer-motion**: This library is used to add animations to the component, enhancing the user experience.

## Props

The `CalendarMi` component accepts the following props:

- `nextDate`: A date representing the next important date to be displayed on the calendar.
- `menstruationDates`: An array of dates representing menstruation dates.
- `ovulationDates`: An array of dates representing ovulation dates.

## Component Structure

The component is structured as follows:

1. **State Management**: The component uses React's `useState` hook to manage the selected dates (`selectedDates`). The `selectedDates` state represents the dates that are currently selected on the calendar.

2. **Modifiers**: The `modifiers` object is used to define modifiers for the calendar, such as "selected," "menstruation," and "ovulations." These modifiers are used to highlight specific dates on the calendar.

3. **Side Effect**: The `useEffect` hook is used to set the `selectedDates` state when the `nextDate` property changes. This is done by fetching the `nextDate` and updating the state accordingly.

4. **Modifier Class Names**: The `modifiersClassNames` object is used to define CSS class names for specific modifiers, such as "menstruation" and "ovulations."

5. **Scroll Handling**: The `handleScroll` function is used to prevent scroll events from propagating, ensuring that the calendar does not scroll when the user interacts with it.

6. **Render**: The component's structure includes the following elements:

   - A `div` element with an `onWheel` event handler to prevent scroll events.
   - A `motion.div` element with a class name, initial animation, and calendar display.
   - An instructional section that explains the color codes for different types of dates.
   - The `Calendar` component, which displays the calendar with the defined modifiers and class names.

This component provides a visually appealing and interactive calendar interface for tracking important dates, such as menstruation and ovulation. It also supports animations for a smoother user experience.


# RadioButton Component

The `RadioButton` component is a React component that renders a set of radio buttons for a specific question with associated options. This component includes animation effects for a smoother user experience.

## Dependencies

The component utilizes the following library:

- **framer-motion**: This library is used to create animation effects when the component is initially rendered.

## Props

The `RadioButton` component accepts the following props:

- `question`: A string representing the question or prompt associated with the radio buttons.
- `options`: An object that contains the available options as key-value pairs. The keys represent the option values, and the values represent the option labels.
- `selectedValue`: A string representing the currently selected option.
- `onChangeValue`: A function that is called when the user selects a different radio button option. It allows the parent component to update the selected value.

## Component Structure

The component's structure can be summarized as follows:

1. **Animation**: The component uses the `framer-motion` library to provide animation effects when it is initially rendered. It fades in and scales up from a smaller size to its normal size over a duration of 0.5 seconds.

2. **Render**: The component's rendering includes the following elements:

   - A paragraph (`<p>`) displaying the provided `question`.
   - A container with a class name (`'answers-q'`) to group the radio button options.
   - A mapping over the `options` object to create a set of radio buttons, where each radio button is associated with a label and an input element. The `checked` property of the radio button is determined based on whether it matches the `selectedValue`.

The `RadioButton` component is designed to be a user-friendly and visually appealing way to present a question with multiple radio button options, and it supports interactive selection and animation effects for a more engaging user experience.


# Preloader Component

The `Preloader` component is a React component that serves as a loading or preloading screen to be displayed while content or assets are being loaded. It features a creative visual representation of waves and text elements.

## Component Structure

The component's structure can be described as follows:

1. **Waves**: The component contains two sections, each referred to as "coast," which represents the shore, and within each coast, there is a "wave-rel-wrap" element that encapsulates a "wave" element. These elements create the illusion of waves. The second coast is delayed to provide a staggered wave effect.

2. **Text Elements**: The component includes multiple text elements with class names such as "text-w," "text-a," "text-v," and so on, each corresponding to a letter. When combined, these text elements spell out the word "Nautilus," which appears to be forming as the waves move.

3. **Custom Image**: At the end of the text elements, there is an additional "text-ja" element that includes an image rendered from the `calendar.svg` file. This image is customized to be a part of the loading animation.

4. **CSS Classes**: The component uses various CSS classes to style and position the elements effectively, creating a visually appealing loading animation.

## Usage

This `Preloader` component can be used as an introductory loading screen in a web application to engage users while content is being fetched or assets are being loaded. The combination of wave animations and text formation provides an attractive and creative loading experience.

# InlinePicker Component

The `InlinePicker` component is a React component that provides a user interface for selecting values from a list of options. It integrates animations and state management to create an engaging and interactive selection experience.

## Dependencies

The component relies on the following libraries and components:

- **framer-motion**: This library is used to add animation effects when the component is initially rendered.
- **react**: The React library is used for building the component and managing its state.
- **react-mobile-picker**: This library is used to create the mobile-like picker interface for selecting options.

## Props

The `InlinePicker` component accepts the following props:

- `selectionsValue`: An array of options that the user can choose from.
- `selectedValue`: A function that is called when an option is selected to update the selected value.
- `question`: A string representing the question or prompt displayed above the picker.
- `pickersNext`: A function to advance to the next step or action when the "Next" button is clicked.

## Component Structure

The structure of the `InlinePicker` component can be broken down into several parts:

1. **Local State**: The component maintains local state using the `useState` hook, including the `pickerValue` to track the selected value and `showBtn` to manage the visibility of the "Next" button.

2. **`handleChange` Function**: This function is responsible for updating the `pickerValue`, calling the `selectedValue` function with the selected value, and showing the "Next" button.

3. **Initialize Selected Value**: The `useEffect` hook initializes the selected value with the first option from `selectionsValue`.

4. **Button Actions**: The `btnActions` function handles the action to be performed when the "Next" button is clicked, in this case, calling the `pickersNext` function and hiding the button.

5. **Rendering**: The component renders the following elements:
   - A div containing the question or prompt.
   - A `Picker` component that allows users to select from the list of options, with a single column where each option is rendered using the `renderOptions` function. Selected options are styled differently.
   - A "Next" button that is initially hidden and becomes visible after an option is selected. The button triggers the `btnActions` function when clicked.

6. **Animation**: The component uses `framer-motion` to provide animation effects when it is initially rendered, including fading in and scaling up over a duration of 0.5 seconds.

## Usage

The `InlinePicker` component is designed to create an interactive option selection interface that can be integrated into a larger application. Users can select from a list of options, and when an option is chosen, they can advance to the next step or action by clicking the "Next" button. This component enhances the user experience by combining animation and user interaction.
