# AI Agent Quick Start Guide

## For Users

### How to Use the AI Agent

1. **Navigate to AI Agent Page**
   - Click "AI Agent" in the sidebar
   - You'll see the agent dashboard

2. **Configure the Agent**
   - Click the "Configure" button
   - Fill in your preferences:
     - **Daily Limit**: How many jobs to apply to per day (e.g., 10)
     - **Keywords**: Job titles or skills you're looking for (e.g., "React, Node.js, Python")
     - **Locations**: Where you want to work (e.g., "Remote, San Francisco, New York")
     - **Salary Range**: Your expected salary range
     - **Remote Only**: Check if you only want remote positions
   - Click "Save Configuration"

3. **Start the Agent**
   - Click the "Start Agent" button
   - The agent will begin auto-applying to matching jobs
   - You'll see the status change to "🟢 Running"

4. **Monitor Progress**
   - View real-time stats on the Agent page:
     - Applications today
     - Applications this week
     - Total applications
     - Success rate
   - Check the "Applications" page to see all applied jobs
   - Jobs applied by the agent will have a "🤖 Agent Applied" badge

5. **Pause/Resume**
   - Click "Pause Agent" to stop auto-applying
   - Click "Start Agent" to resume
   - You can update configuration anytime

## For Developers

### File Structure

```
app/
├── (dashboard)/dashboard/agent/
│   └── page.js                          # Agent UI page
├── api/
│   ├── agent/[userId]/
│   │   ├── route.js                     # Agent config API
│   │   └── stats/route.js               # Agent stats API
│   └── applications/user/[userId]/
│       └── route.js                     # Auto-apply logic here
```

### Key Files to Modify for Production

1. **Auto-Apply Logic** (`app/api/applications/user/[userId]/route.js`)
   - Lines 25-101: Replace mock matching with real job board APIs
   - Add ML-based job matching
   - Implement rate limiting

2. **Agent Configuration** (`app/api/agent/[userId]/route.js`)
   - Add more configuration options
   - Implement validation
   - Add API key management for job boards

3. **Agent Stats** (`app/api/agent/[userId]/stats/route.js`)
   - Add more metrics (response rate, interview rate)
   - Implement caching for performance
   - Add historical data tracking

4. **Agent UI** (`app/(dashboard)/dashboard/agent/page.js`)
   - Add job preview before applying
   - Add confirmation modals
   - Add cost estimates
   - Add application history timeline

### Testing the Agent

1. **Sign in as an applicant**
2. **Configure the agent** with test keywords (e.g., "Software Engineer")
3. **Start the agent**
4. **Navigate to Applications page** - you should see new applications appear
5. **Check stats** on Agent page - numbers should update

### Mock Data Flow

```
User starts agent
    ↓
Agent status = 'running' saved to MongoDB
    ↓
Agent page starts 60-second interval timer
    ↓
Every 60 seconds:
    ↓
POST /api/agent/:userId/apply triggered
    ↓
Checks daily limit
    ↓
Queries jobs collection with agent config filters
    ↓
Creates 1 new application
    ↓
Returns application details
    ↓
UI shows live workflow animation
    ↓
Stats update in real-time
```

### Database Collections

**agents**
```javascript
{
  userId: "507f1f77bcf86cd799439011",
  status: "running",
  dailyLimit: 10,
  keywords: ["React", "Node.js"],
  locations: ["Remote", "San Francisco"],
  minSalary: "100000",
  maxSalary: "200000",
  remoteOnly: true,
  createdAt: ISODate("2025-11-16T..."),
  updatedAt: ISODate("2025-11-16T...")
}
```

**applications** (agent-generated)
```javascript
{
  userId: "507f1f77bcf86cd799439011",
  jobId: "507f1f77bcf86cd799439012",
  status: "pending",
  source: "agent",  // Important: identifies agent applications
  coverLetter: "AI-generated application for...",
  appliedDate: ISODate("2025-11-16T..."),
  createdAt: ISODate("2025-11-16T..."),
  updatedAt: ISODate("2025-11-16T...")
}
```

### Common Customizations

#### Change Daily Limit Default
```javascript
// app/api/agent/[userId]/route.js
dailyLimit: body.dailyLimit ?? 10, // Change 10 to your default
```

#### Add New Configuration Field
```javascript
// 1. Add to agent schema (route.js)
newField: body.newField ?? defaultValue,

// 2. Add to UI form (page.js)
<Input
  label="New Field"
  value={configForm.newField}
  onChange={(e) => setConfigForm({ ...configForm, newField: e.target.value })}
/>

// 3. Use in auto-apply logic (applications route.js)
if (agent.newField) {
  jobQuery.someField = agent.newField;
}
```

#### Customize Job Matching
```javascript
// app/api/applications/user/[userId]/route.js
// Lines 56-75: Modify jobQuery object
jobQuery.customField = customValue;
```

### Debugging Tips

1. **Agent not applying**
   - Check MongoDB `agents` collection - is status 'running'?
   - Check `keywords` array - is it populated?
   - Check daily limit - is it reached?
   - Check `jobs` collection - are there matching jobs?

2. **Stats not showing**
   - Check MongoDB `applications` collection
   - Verify `source: 'agent'` is set
   - Check date calculations in stats API

3. **Too many applications**
   - Verify daily limit logic in auto-apply
   - Check if multiple requests are triggering auto-apply

### Performance Notes

- Auto-apply runs on-demand (when fetching applications)
- Applies to 2-3 jobs per request to simulate gradual application
- For production, move to background job queue (Bull, BullMQ)
- Add indexes on MongoDB collections for better performance

### Security Notes

- Currently uses localStorage for user ID (demo only)
- For production: implement proper JWT authentication
- Add rate limiting to prevent abuse
- Validate all user inputs
- Sanitize configuration data

---

**Need Help?** Check `docs/AGENT_SYSTEM.md` for full documentation.

