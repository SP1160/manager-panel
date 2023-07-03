# Сar rental company manager dashboard

The application is a site - a manager's panel. It consists of a menu and 5 tables. Each table has the functionality to create, edit and delete data. If the user wants to change the theme, he can click the switch at the bottom left (works through localStorage).

## ER model of the subject area

![er-diagramma](https://github.com/SP1160/manager-panel/blob/master/er-diagramma-car-rent.jpg)

## Tech Stack

-   HTML
-   CSS
-   JavaScript
-   [json-server](https://github.com/typicode/json-server)
-   [axios](https://github.com/axios/axios)

## Features

-   Create - works in such a way that first the script opens a form, then the user fills in the data and clicks Submit. After that, the program checks if the data entered by the user already exists in the database. If the data are identical, the console will warn you that such data already exist and the program cannot add your data.
-   Edit - the script works in such a way that first it opens the form with the data of the line whose icon you clicked. Then the user changes the data and clicks Submit. If the user did not change the data the console will say so. If the user changed the data, but it is the same as what is already in the table, the console will display a warning about this. If the user tries to edit data that are already in the rental agreement, the form will not open and the console will display a message stating that the data cannot be edited while it is involved in the rental agreement.
-   Delete - works in such a way that by clicking on the delete icon in the desired row, the user can delete the data both from the database and from the page. If the user tries to delete the data, which are used in the rental contract, the console will say that it is impossible to delete data if they are used in the rental contracts.
-   Show - works in such a way that when you click on the icon to show the rental agreement, a page is generated with the agreement and the data inserted there from the line you clicked on.

## Installation

-   Clone this repository to your local machine

```bash
git clone https://github.com/SP1160/manager-panel.git
```

-   Install the necessary dependencies

```bash
npm install
```

## Usage

-   In vscode run the [live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) plugin (you need to install it) `index.html`
-   Open a terminal in vscode and write the command `npm run server`

### Using the application to add data

-   The employee clicks on the table he wants
-   Then clicks the create icon and a form for adding a position opens
-   There are 3 buttons in each form:
    -   Reset - clear form fields
    -   Back - return to the main page
    -   Submit - send data from the form
-   An employee clicks the Submit button after filling in the data
-   After the query to the database is executed and the data are added to the database

### Using the application to edit data

-   Employee clicks on the table he wants
-   Then he/she clicks on the edit icon and the data editing form opens (the form already contains the data you clicked on)
-   The employee edits the data they want (if the data remains the same, the console will say a warning that the data have not changed)
-   Then click the `Submit` button and a DB query will be sent and the data will be edited.

### Using the app to delete data

-   The employee enters the table that he wants
-   Then clicks the delete icon
-   The database is queried and the data is deleted from the database

### Using the application to show the contract

-   Employee clicks on the `Contract` table
-   Next, in the table, clicks the contract display icon
-   The contract is generated with the data that were in this row (if the user wants to return to the main page, there is a `Back` button at the very bottom for this)

## License

[MIT](https://choosealicense.com/licenses/mit/)
