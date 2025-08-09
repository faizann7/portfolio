# Case Study System

This directory contains JSON files for case study content, making it easy to add and manage case studies without editing JSX code.

## How to Add a New Case Study

1. **Create a JSON file** in this directory with the format: `{project-id}.json`
2. **Follow the structure** shown in the examples below
3. **Add the project ID** to `generateStaticParams()` in `app/work/[project]/page.tsx`

## JSON Structure

```json
{
  "id": "your-project-id",
  "title": "Project Title",
  "description": "Brief project description",
  "role": "Your Role",
  "duration": "Project Duration",
  "tools": "Tools Used",
  "platform": "Optional: e.g., Mobile app, Web + Mobile",
  "team": "Optional: e.g., Solo project, Product + Engineering",
  "problem": "Optional: Problem statement shown in snapshot",
  "whatIDid": "Optional: Summary of what you did",
  "keyResults": [{ "value": "130%", "label": "Increase in conversion" }],
  "overview": "Detailed overview of the project",
  "overviewHeading": "Optional custom heading for overview",
  "goal": "Project goal or objective",
  "sections": [
    {
      "title": "Section Title",
      "content": [
        { "type": "paragraph", "text": "Paragraph content" },
        { "type": "heading", "text": "Subheading", "level": 3 },
        { "type": "image", "src": "/images/project/image.png", "alt": "Image", "width": 1400, "height": 800, "fullWidth": true },
        { "type": "list", "items": ["List item 1", "List item 2"] }
      ]
    }
  ],
  "results": "Project results and outcomes",
  "finalScreens": [
    { "title": "Screen Title", "description": "Screen description", "image": "/images/project/screen.png" }
  ]
}
```

## Content Types

### Paragraph
```json
{ "type": "paragraph", "text": "Your paragraph content here" }
```

### Heading
```json
{ "type": "heading", "text": "Your heading text", "level": 3 }
```

### Image
```json
{ "type": "image", "src": "/images/project/image.png", "alt": "Image description", "width": 1400, "height": 800, "fullWidth": true }
```

**Image Options:**
- `fullWidth: true` - Image takes full viewport width (1120px max)
- `fullWidth: false` - Image takes container width (768px max)

### List
```json
{ "type": "list", "items": ["First item", "Second item", "Third item"] }
```

## Examples

- `cinefatic.json` - Complete case study with all content types
- `swapp.json` - Simple example case study

## Benefits

1. **No JSX editing required** - Just edit JSON files
2. **Consistent structure** - All case studies follow the same format
3. **Easy to maintain** - Content separated from presentation
4. **Flexible image handling** - Choose between full-width and container-width
5. **Type-safe** - TypeScript interfaces ensure data consistency

## Snapshot Fields

If provided in JSON, these will override the defaults in the snapshot section:
- `platform` and `team`
- `problem`
- `whatIDid`
- `keyResults` (array of objects with `value` and `label`)

## Migration from Legacy System

Existing case studies will continue to work. The system automatically detects:
- **New JSON-based case studies** - Uses `CaseStudyRenderer`
- **Legacy case studies** - Uses existing JSX rendering

To migrate a legacy case study:
1. Create a JSON file following the structure above
2. Convert the JSX content to JSON format
3. The system will automatically use the new format 