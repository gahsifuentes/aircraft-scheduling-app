# Aircraft Scheduling Application

## How to Run the Application

### Prerequisites
- Node.js (latest LTS version recommended): [Download Node.js](https://nodejs.org/)
- Git (optional, if you plan to clone the repository)

### Setup
Clone the repository or download the source code:
```bash
git clone <repository-url>
```

Navigate to the project directory:
```bash
cd my-aircraft-scheduling-app
```

### Install Dependencies
```bash
npm install
```

### Run the Application in Development Mode
```bash
npm run dev
```

Access the application at `http://localhost:3000`.

## Application Screenshot

![Application Screenshot](/assets/aircraft-scheduling-app-ss.jpg)

## Technologies Utilized
- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering and generating static websites.
- **TailwindCSS**: A utility-first CSS framework for rapidly building custom designs.
- **Radix-ui**: Low-level UI primitives for building accessible design systems and web apps.

## Assumptions
- **Aircraft Starting Locations**: Assumed each aircraft could start from any location as initial base locations did not match flight airports.
- **Operational Period**: A 24-hour period was assumed for calculating aircraft utilization and timeline representation.
- **Usage of Radix-ui**: Utilized Radix-ui's HoverCard component for displaying timeline segment details.
- **Flight Selection Logic**: Enforced logical and chronological order in flight selection with UI feedback to facilitate operational integrity.

## Areas for Enhancement
- **Testing**: Implement unit and integration tests to ensure application stability.
- **Performance**:
  - **Lazy Loading/Pagination**: Consider if dataset size increases.
  - **Memoization**: Prevent unnecessary re-renders using React techniques.
- **User Interface**:
  - **Responsiveness**: Ensure full responsiveness across all devices.
  - **Theme Toggling**: Allow users to switch between light and dark modes.
  - **Accessibility**: Improve keyboard navigability and screen reader support.
- **New Features**:
  - **Multi-Day Scheduling**: Extend scheduling functionality to multiple days.
  - **Route Suggestion**: Suggest optimal rotations based on starting location.
- **Documentation and Advanced Metrics**: Enhance documentation and integrate operational metrics for better decision-making.