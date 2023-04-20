# Next Starter

## Project Structure

```
├── /app/                       # The project Router (Support for layouts, Server Components, streaming, and colocated data fetching.)
│   ├── /api/                   # API Routes (API routes provide a solution to build your API with Next.js.)
│   ├── /layout.tsx             # A layout is UI that is shared between multiple pages
│   ├── /page.tsx               # A page is UI that is unique to a route
│   ├── /providers.tsx          # Wrap providers in your own Client Component
│   ...   
├── /constants/                 # The project constants
├── /components/                # Components that render the UI
├── /containers/                # Containers serve as a bridge between the components and the logic
├── /docs/                      # The project documents
├── /hooks/                     # Hooks function that are used frequently in the project
├── /services/                  # API services provide access to data and functionality through APIs
├── /stores/                    # Stores have business logic and application state
├── /hooks/                     # hook functions that are used frequently in the project
├── /utils/                     # Utility classes and functions that are used frequently in the project
│   ├── /common/                # Common utility
│   ├── /request/               # Request utility
│   └── /swr/                   # SWR utility
...
└──  package.json               # Record important metadata about the project.
```
