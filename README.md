 # WomensCalendar-Natasha

WomensCalendar-Natasha is a women's period and ovulation tracker app functioning as a mini app on Telegram. It allows users to keep track of their menstruation cycle and predict ovulation dates, all through a user-friendly and intuitive interface.

## Features

1. **Main Page Overview:** The main page provides a brief overview of the next 5 days and the previous 2 days' history of your period or ovulation.
2. **Scrollable Calendar:** The app features a scrollable calendar for a comprehensive view of monthly data.
3. **Personalized Questions:** To begin, you will be asked a few simple questions about your cycle lengths to ensure accurate tracking and predictions.
4. **Dynamic Themes:** The app fetches the Telegram WebApp info to adapt our app's background color and text to the user's default colors.
5. **Motions:** We're using `framer-motion` library to create appealing motions throughout the app.
6. **React-Nice-Dates:** The 'react-nice-dates' library has been utilized for the calendar functionality.
7. **Mobile Picker:** The `react-mobile-picker` is used for picking numbers.

## Database

We have employed Telegram's CloudStorage as our database, providing reliable and seamless data storage and retrieval.

## Local Installation 

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

Now, WomensCalendar-Natasha should be running at `localhost:3000` (or whatever port you specified).

Make sure you have Node.js and npm installed on your local machine. If you do not, you can install them from [here](https://nodejs.org/).


## License

We are using MIT license, so you are free to use our code

## Made by
Aleksis Kvjatkovskis 🇱🇻 and 
Michael Lytvyn 🇺🇦
