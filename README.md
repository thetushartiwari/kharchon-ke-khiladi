# Kharchon Ke Khiladi

A minimal, aesthetic, and clean full-stack finance web app built with Next.js 14 (App Router), TypeScript, shadcn/ui, Tailwind CSS, and MongoDB Atlas.

## Project Structure

\`\`\`
kharchon-ke-khiladi/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                # Landing/homepage
│   └── dashboard/
│       └── page.tsx            # Dashboard entry point
│   └── api/
│       └── transactions/
│           └── route.ts        # GET, POST, PUT, DELETE for transactions
│       └── income/
│           └── route.ts        # POST/GET for user income
├── components/
│   ├── Transactions.tsx        # Handles expense form, list, edit/delete
│   ├── IncomeForm.tsx          # Handles user name + monthly income form
│   ├── MonthlyExpensesChart.tsx
│   ├── CategoryPieChart.tsx
│   ├── BudgetVsExpensesChart.tsx
│   ├── SearchBar.tsx
│   └── ui/                     # Only shadcn/ui primitives used
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── table.tsx
│       └── date-picker.tsx
├── lib/
│   ├── db.ts                   # MongoDB connection
│   └── models/
│       ├── Transaction.ts
│       └── Income.ts
├── styles/
│   └── globals.css
├── tailwind.config.ts
├── README.md
\`\`\`

## Setup Instructions

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/kharchon-ke-khiladi.git
   cd kharchon-ke-khiladi
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env.local` file in the root directory with your MongoDB connection string:
   \`\`\`
   MONGODB_URI=mongodb+srv://thenightsun:Password55@cluster0.mongodb.net/kharchon-ke-khiladi?retryWrites=true&w=majority
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Landing Page
- Clean, aesthetic design with orange, white, and green theme
- Hindi title and subtitle
- Three feature cards highlighting the app's capabilities

### Dashboard
- User income form to set name and monthly income
- Transaction management (add, edit, delete expenses)
- Search functionality to filter expenses
- Visualizations:
  - Monthly expenses bar chart
  - Category-wise pie chart
  - Budget vs. expenses comparison chart
- Dark mode support

### Data Management
- MongoDB Atlas for data storage
- Session-based data storage using localStorage
- RESTful API endpoints for transactions and income

## Technologies Used

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS for styling
- shadcn/ui for UI components
- MongoDB Atlas for database
- Recharts for data visualization
- next-themes for dark mode support

## Design Principles

- Minimal, clean UI with orange, white, and green theme
- Responsive design for all screen sizes
- Accessible components
- DRY (Don't Repeat Yourself) code principles
- Server actions for data fetching and mutations
