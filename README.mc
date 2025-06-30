# GraphQL Profile

A dynamic profile dashboard built with GraphQL that displays personal school information, statistics, and achievements through interactive SVG graphs.

## Project Overview

This project demonstrates proficiency in GraphQL query language by creating a personalized profile page that fetches and displays user data from the Zone01 Kisumu GraphQL endpoint. The application features a secure login system, comprehensive user statistics, and interactive data visualizations.

## Features

### Authentication
- **Secure Login System**: JWT-based authentication
- **Multiple Login Options**: Support for both username/password and email/password
- **Session Management**: Proper logout functionality
- **Error Handling**: Clear error messages for invalid credentials

### Profile Information
Choose from various data sections including:
- Basic user identification
- XP amount and progression
- Project grades and completion status
- Audit statistics
- Skill assessments

### Data Visualizations
Interactive SVG graphs displaying:
- **XP Progress Over Time**: Track learning journey progression
- **XP Distribution by Project**: Analyze performance across different projects
- **Audit Ratio Metrics**: Visualize peer review statistics
- **Pass/Fail Ratios**: Project success rates
- **Piscine Statistics**: Detailed JS/Go piscine performance data

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **API**: GraphQL with JWT authentication
- **Visualizations**: SVG-based charts and graphs
- **Hosting**: Deployable on GitHub Pages, Netlify, or similar platforms

## Getting Started

### Prerequisites
- Valid Zone01 Kisumu account credentials
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://learn.zone01kisumu.ke/git/joseowino/graphql
   cd graphql
   ```

2. **Open the application**
   - For local development: Open `index.html` in your browser
   - For hosted version: Deploy to your preferred hosting platform

### Configuration

The application connects to:
- **GraphQL Endpoint**: `https://learn.zone01kisumu.ke/api/graphql-engine/v1/graphql`
- **Authentication Endpoint**: `https://learn.zone01kisumu.ke/api/auth/signin`

## GraphQL Schema Overview

### Key Tables and Fields

#### User Table
```graphql
{
  user {
    id
    login
  }
}
```

#### Transactions (XP Data)
```graphql
{
  transaction {
    id
    type
    amount
    objectId
    userId
    createdAt
    path
  }
}
```

#### Progress Tracking
```graphql
{
  progress {
    id
    userId
    objectId
    grade
    createdAt
    updatedAt
    path
  }
}
```

#### Results
```graphql
{
  result {
    id
    objectId
    userId
    grade
    type
    createdAt
    updatedAt
    path
  }
}
```

### Query Examples

**Basic User Query:**
```graphql
{
  user {
    id
    login
  }
}
```

**Nested Query with User and Results:**
```graphql
{
  result {
    id
    user {
      id
      login
    }
  }
}
```

**Filtered Query with Arguments:**
```graphql
{
  object(where: { id: { _eq: 3323 }}) {
    name
    type
  }
}
```

## Authentication Flow

1. **Login Request**: POST to signin endpoint with Basic authentication
2. **JWT Receipt**: Server returns JSON Web Token
3. **Authenticated Queries**: Include JWT in Authorization header as Bearer token
4. **Data Access**: Token provides access only to user's own data

## Statistics and Graphs

The dashboard generates various SVG-based visualizations:

- **Time-based XP Growth**: Line charts showing learning progression
- **Project Performance**: Bar charts displaying XP earned per project
- **Audit Analytics**: Pie charts showing audit ratios
- **Success Metrics**: Visual representation of pass/fail statistics
- **Exercise Attempts**: Detailed breakdown of piscine performance

## Deployment

This project has been hosted on [*GitHub Pages*](https://joseowino.github.io/graphql/): Free hosting for static sites


##  Database Structure

The application interacts with several interconnected tables:
- `user`: User identification and basic information
- `transaction`: XP transactions and audit data
- `progress`: Learning progression tracking
- `result`: Exercise and project results
- `object`: Information about exercises and projects

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the Zone01 Kisumu curriculum and follows the school's academic guidelines.

## Author

**Joseph Owino** - [@joseowino](https://github.com/joseowino/graphql)

---

*Built with ❤️ at Zone01 Kisumu*