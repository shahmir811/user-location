# User Location

> React app build to monitor some user's building lists, each user has his building list which is different from other users. and we have the privileges to create, update or delete buildings in user's data ( as admins )

Our task is to create a simple interface to show a dropdown of users and a building list to show user's building lists.Each building have a MapView which shows the location of building on map with Marker.

### WorkFlow

- View start point will be showing a dropdown with a placeholder of the select user.
- On selecting user show loader in building list container while fetching data.
- Show each user building list in a container after the dropdown list.
- Select first building from the selected user as default. And Show loader on MapView Container until map is fully loaded. Show MapView of that building with Marker (on Hover of marker should display Building name and Country name in a tooltip).
- We can select any building from the list to see the MapView of that building.
- We can create, update and delete current selected user buildings list.
- On Click of Add Button /Edit icon of building the MapView should remove from the DOM and Show Add/Edit Form container.
- In Add/Edit Form for Location drop down show the Countries list from countriesList.json.
- After Add/Edit sucessfully, select the updated Builiing and show the MapView of that building.

### Things different from normal React App

- Not used create-react-app. Build whole application from scratch, developed own boiler plate.
- Not used ant react library/wrapper for Google Maps API.
- Followed only functional paradigm.
- You can use ContextAPI for managing the state and data logic.
- You can use `useReducer` hook for actions and state updates.
- You can fake-fetching data with `Promises` and `setTimeout` to show loaders.
- Create users, buildings models as you needed. Store all data in localStorage no need to use/write Rest API.
