# Figma reference

A local snapshot of the "Portal Task" design. Compare against these files instead of calling the Figma MCP, which has a Starter-plan call limit.

- Source: Figma file `04Q7EHGrcMmgsC4Q6lMeX5` (a copy of `EzcdNmsguvDXp5hz4dLcLh`), page "Main flow"
- Exported: 2026-10-29

| File | Contents |
|---|---|
| `screens/*.png` | Rendered frames at 1× |
| `spec.md` | Readable style dump per frame: sizes, radii, auto-layout, fills, strokes, effects, text styles |
| `nodes.json` | REST `/v1/files/:key/nodes` response for the frames below. Hidden nodes, vector geometry and prototype data are removed. |

| Frame | Node id | Screenshot |
|---|---|---|
| Overview (desktop list) | `3:7764` | `overview.png` |
| Overview / Menu open | `3:10387` | `menu-open.png` |
| Mobile list | `6:22203` | `mobile.png` |
| Editor / Empty | `6:13342` | `editor-empty.png` |
| Editor / In progress | `6:14001` | `editor-progress.png` |
| Editor / Filled | `5:12865` | `editor-filled.png` |
| Delete modal | `6:14208` | `delete-modal.png` |
| Components (card states, menu, menu items) | `6:14210` | `components.png` |

## Refreshing

The REST API needs a personal access token with the `file_content:read` scope. It is not subject to the MCP call limit.

```sh
curl -sf -H "X-Figma-Token: $(tr -d '[:space:]' < .figma-token)" \
  "https://api.figma.com/v1/files/04Q7EHGrcMmgsC4Q6lMeX5/nodes?ids=3:7764,3:10387,5:12865,6:13342,6:14001,6:14208,6:14210,6:22203" \
  -o nodes.raw.json
```

The raw response is about 5.7 MB. `nodes.json` here is that response with hidden nodes, vector geometry and prototype data removed. The screenshots came from the Figma MCP `get_screenshot` tool.
