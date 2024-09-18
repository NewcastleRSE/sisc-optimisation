
# Spatial Inequality in the Smart City Decision Support Tool

## About

A reworking of the original Spatial Inequality project to accompany latest publications. The Geoserver and data layers elements have been removed, and sensor network generation has been retained. Relies on the spatial inequality API, currently deployed on Azure. 

### Project Team
Professor Rachel Franklin, Newcastle University  ([rachel.franklin@newcastle.ac.uk](mailto:rachel.franklin@newcastle.ac.uk))    
Eman Zied-Abozied, Newcastle University  ([eman.zied-abozied@newcastle.ac.uk](mailto:Eman.Zied-Abozied@newcastle.ac.uk))   
Dr Jack Roberts, The Alan Turing Institute ([jroberts@turing.ac.uk](mailto:jroberts@turing.ac.uk)) 
  
Previous team members:  
Caitlin Robinson, Liverpool University  
David Herbert, Newcastle University  

### RSE Contact
Dr Kate Court, RSE Team, Newcastle University ([kate.court@newcastle.ac.uk](mailto:kate.court@newcastle.ac.uk))  

## Built With

[Angular](https://angular.io/)   
[Leaflet](https://leafletjs.com/plugins.html#printexport)  

## Getting Started

### Prerequisites

Node.js 10.13 is needed at a minimum.

### Installation

Clone the repo and navigate to it. Run ```npm install``` to install all the required packages.

### Running Locally

To run: ```ng serve```,

### Running Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `cypress:open` to execute end to end tests using [Cypress](https://www.cypress.io/).

## Deployment

This site is deployed using Github Pages. To update the site, run this command:
`ng build --prod --output-path docs --base-href `    

The `docs` folder should be updated. Then push to the main branch. 

## Usage

[Site](https://sisc-decision-support-tool.azurewebsites.net)

Any links to production environment, video demos and screenshots.

## Roadmap

- [x] Initial Research  
- [x] Minimum viable product  
- [x] Alpha Release  
- [x] Feature-Complete Release  

## Contributing

### Main Branch
Protected and can only be pushed to via pull requests. Should be considered stable and a representation of production code.

### Dev Branch
Should be considered fragile, code should compile and run but features may be prone to errors.

### Feature Branches
A branch per feature being worked on.

https://nvie.com/posts/a-successful-git-branching-model/

## License

## Citation
See DOI badge at the top of the README