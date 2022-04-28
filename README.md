# Forum Software

Forum Software is my defense project for the Angular course at [SoftUni](https://softuni.bg/). The software is powered by a C#/.NET 6 backend and supports a MSSQL database. The project overview, architecture and technology stack is reviewed bellow:

![Screenshot](readme_picture.png?raw=true "Screenshot")

## :pencil: Overview
Forum is a general-purpose forum software for collaborative communication. It can be used from companies, who can showcase their products and open a general discussion boards for them or for people who are fans of fantasy books, movies, TV series and they just want to reveal, and discuss with others their deeply hidden imaginations. The project's primary goal is to be a simple, modern, mobile-responsive and easy for navigation. It provides an opportunity for participants to choose their own avatars, start discussions on new topics and join in ongoing discussions.

## :hammer: Architecture
The forum software is build with the following technologies: Angular, Bootstrap, Material, Angular Material, C#/.NET 6, MSSQL. The architecture is accomplished using modern approaches in web development architecture, where we have a single page application **SPA** in conjunction with a server-side web **API**, utilizing the **folder-by-feature**, architecture. User interactions are performed in the SPA mode using client-side routing. The client-side route handler is responsible for servicing a given client-side route and rendering content to the web page (the user interface) using the client-side template renderer. The client-side application can initiate a XHR request to a REST API endpoint on the web server, via Angular's build-ins like the HttpClient, then retrieve data from the **C#/.NET 6** server's response, and render content on the web page using **Angular** DOM manipulation techniques.

## :gear: Technology Stack
### Front-End
- [Angular](https://angular.io/)
- [RxJS](https://rxjs.dev/)
- localStorage (DOM API's)
- Custom Build Authentication via JWT

### Back-End
- [C#](https://docs.microsoft.com/en-us/dotnet/csharp/)
- [.NET6](https://docs.microsoft.com/en-us/dotnet/csharp/)
- [MSSQL](https://docs.microsoft.com/en-us/dotnet/csharp/)

## How To Run
- In the client project directory, you can run `npm start` to run the app in the development mode. Open [http://localhost:4200](http://localhost:4200) to view it in the browser.
- In the server project directory, you can open the .sln file and run the server via `IIS Express`. Which will also configure an MSSQL database, which requires the DB Server to be installed and running on the machine. Open [https://localhost:44353](https://localhost:44353) to view it in the browser. The homepage would be swaggers Open API definitions for all endpoints.