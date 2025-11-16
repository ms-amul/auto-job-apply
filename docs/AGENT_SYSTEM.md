# AI Agent System Documentation

## Overview

The AI Agent is an automated job application system that allows users to configure preferences and have the system automatically apply to matching jobs on their behalf.

## Current Implementation (MOCK)

### Architecture

```
User → Agent Configuration → MongoDB Storage → Auto-Apply Logic → Applications Collection
```

### Components

#### 1. Agent Page (`app/(dashboard)/dashboard/agent/page.js`)
- **Purpose**: User interface for configuring and managing the AI agent
- **Features**:
  - Configuration panel for setting preferences
  - Real-time stats display
  - Start/Pause agent controls
  - Visual feedback on agent status
  
#### 2. Agent API (`app/api/agent/[userId]/route.js`)
- **Endpoints**:
  - `GET /api/agent/:userId` - Fetch agent configuration
  - `PUT /api/agent/:userId` - Update agent configuration
- **Configuration Fields**:
  - `dailyLimit`: Maximum applications per day (default: 10)
  - `keywords`: Array of job keywords to match
  - `locations`: Preferred job locations
  - `minSalary`: Minimum salary requirement
  - `maxSalary`: Maximum salary requirement
  - `remoteOnly`: Boolean for remote-only jobs
  - `status`: 'running' or 'paused'

#### 3. Agent Stats API (`app/api/agent/[userId]/stats/route.js`)
- **Purpose**: Calculate and return real-time statistics
- **Metrics**:
  - Applications today
  - Applications this week
  - Total applications
  - Success rate (accepted/total)
  - Breakdown by status (pending, interview, accepted, rejected)

#### 4. Auto-Apply Logic (`app/api/agent/[userId]/apply/route.js`)
- **Trigger**: Called every 60 seconds by the agent page when agent is running
- **Process**:
  1. Check if today's application count is under daily limit
  2. Build job query based on agent configuration:
     - Match keywords in job title or skills
     - Filter by remote preference
     - Filter by salary range
     - Exclude already applied jobs
  3. Apply to 1 matching job per request
  4. Store application with source: 'agent'
  5. Return application details for live workflow display

### Database Schema

#### `agents` Collection
```javascript
{
  userId: String,              // User ID
  status: String,              // 'running' | 'paused'
  dailyLimit: Number,          // Max applications per day
  keywords: Array<String>,     // Job keywords
  locations: Array<String>,    // Preferred locations
  minSalary: String,           // Minimum salary
  maxSalary: String,           // Maximum salary
  remoteOnly: Boolean,         // Remote jobs only
  createdAt: Date,
  updatedAt: Date
}
```

#### `applications` Collection (Agent-generated)
```javascript
{
  userId: String,
  jobId: String,
  status: String,              // 'pending' | 'interview' | 'accepted' | 'rejected'
  source: 'agent',             // Identifies agent-applied jobs
  coverLetter: String,         // AI-generated cover letter
  appliedDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## User Flow

### 1. Configuration
1. User navigates to AI Agent page
2. Clicks "Configure" button
3. Sets preferences:
   - Daily application limit
   - Job keywords (e.g., "React, Node.js, Python")
   - Preferred locations
   - Salary range
   - Remote preference
4. Saves configuration

### 2. Activation
1. User clicks "Start Agent" button
2. Agent status changes to 'running'
3. System begins auto-applying to matching jobs

### 3. Auto-Application
- Agent applies to 1 job every 60 seconds when running
- Respects daily limit
- Matches jobs based on configuration
- Creates applications with source: 'agent'
- Generates AI cover letters
- Live workflow animation shows progress

### 4. Monitoring
- Real-time stats on Agent page
- Applications visible on Applications page with "Agent Applied" badge
- User can pause/resume agent at any time

## Future Migration Plan

### Phase 1: Production Database
- [ ] Migrate from MongoDB to Supabase
- [ ] Add proper indexes for performance
- [ ] Implement database migrations

### Phase 2: Real Job Board Integration
- [ ] Integrate with LinkedIn API
- [ ] Integrate with Indeed API
- [ ] Integrate with Glassdoor API
- [ ] Add API key management
- [ ] Implement rate limiting

### Phase 3: Advanced Matching
- [ ] ML-based job matching algorithm
- [ ] Analyze user profile for better matches
- [ ] Score jobs based on fit
- [ ] Prioritize high-match jobs
- [ ] Learn from user feedback (accept/reject)

### Phase 4: Enhanced Features
- [ ] Email notifications for applications
- [ ] Application status webhooks
- [ ] Custom cover letter templates
- [ ] Resume tailoring per job
- [ ] Interview scheduling integration
- [ ] Application analytics and insights

### Phase 5: Compliance & Safety
- [ ] Rate limiting per job board
- [ ] CAPTCHA handling
- [ ] IP rotation for scraping
- [ ] Terms of service compliance
- [ ] Data privacy (GDPR, CCPA)
- [ ] Application audit logs

## Code Comments Guide

Throughout the codebase, you'll find comments like:

```javascript
// MOCK IMPLEMENTATION - Ready for production migration
// Future: Replace with actual job matching algorithm
```

These indicate areas that are currently mocked and need to be replaced with production logic.

## Testing Strategy

### Current (Mock)
- Manual testing through UI
- Verify daily limits work
- Check keyword matching
- Validate stats calculations

### Future (Production)
- Unit tests for matching algorithm
- Integration tests with job board APIs
- E2E tests for full application flow
- Load testing for scalability
- Mock API responses for CI/CD

## Performance Considerations

### Current
- Auto-apply runs on-demand (when fetching applications)
- Applies to 2-3 jobs per request
- Simple MongoDB queries

### Future
- Background job queue (Bull, BullMQ)
- Scheduled cron jobs
- Distributed workers
- Caching for job listings
- Optimized database queries with indexes

## Security Considerations

### Current
- Basic user authentication
- User-specific data isolation

### Future
- API key encryption
- Secure credential storage
- Rate limiting per user
- Audit logs for all applications
- CAPTCHA bypass detection
- Bot detection countermeasures

## Monitoring & Observability

### Future Implementation
- Application success rate tracking
- Job board API health monitoring
- Error rate alerts
- Performance metrics (latency, throughput)
- User engagement analytics
- Cost tracking (API usage)

## Support & Troubleshooting

### Common Issues

1. **Agent not applying to jobs**
   - Check if agent is configured (has keywords)
   - Verify agent status is 'running'
   - Check if daily limit is reached
   - Verify matching jobs exist in database

2. **Stats not updating**
   - Check MongoDB connection
   - Verify applications have correct `source: 'agent'`
   - Check date calculations in stats API

3. **Too many/few applications**
   - Adjust daily limit in configuration
   - Refine keywords for better matching
   - Check salary range filters

## API Reference

### Agent Configuration
```javascript
PUT /api/agent/:userId
Body: {
  dailyLimit: 10,
  keywords: ['React', 'Node.js'],
  locations: ['Remote', 'San Francisco'],
  minSalary: '100000',
  maxSalary: '200000',
  remoteOnly: true,
  status: 'running'
}
```

### Agent Stats
```javascript
GET /api/agent/:userId/stats
Response: {
  success: true,
  stats: {
    today: 5,
    thisWeek: 23,
    total: 87,
    successRate: '12%',
    accepted: 10,
    pending: 45,
    interview: 15,
    rejected: 17
  }
}
```

### User Applications (triggers auto-apply)
```javascript
GET /api/applications/user/:userId
Response: {
  success: true,
  data: [
    {
      id: '...',
      jobId: '...',
      status: 'pending',
      source: 'agent',
      appliedDate: '2025-11-16T...',
      job: { ... }
    }
  ]
}
```

## Changelog

### v1.0.0 (Current - Mock Implementation)
- Initial agent page with configuration UI
- MongoDB-based storage
- Basic keyword matching
- Daily limit enforcement
- Real-time stats
- Agent start/pause controls

### v2.0.0 (Planned - Production)
- Real job board API integration
- ML-based matching
- Background job processing
- Email notifications
- Advanced analytics

---

**Last Updated**: November 16, 2025  
**Status**: Mock Implementation - Ready for Production Migration

