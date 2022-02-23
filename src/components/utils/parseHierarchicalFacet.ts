import { DisplayableFacet, FacetOption } from "@yext/answers-headless-react"

export type HierarchicalFacetTree = {
  [key: string]: {
    selected: boolean,
    hasSelectedChild: boolean,
    facetOption: FacetOption,
    childTree: HierarchicalFacetTree
  }
}

export default function parseHierarchicalFacet(hierarchicalFacet: DisplayableFacet): HierarchicalFacetTree {
  const optionsInAscendingLength = hierarchicalFacet?.options.map(o => {
    return {
      ...o,
      displayNameTokens: o.displayName.split('>').map(s => s.trim())
    }
  }).sort((a, b) => a.displayNameTokens.length - b.displayNameTokens.length) || []

  const tree: HierarchicalFacetTree = {};

  optionsInAscendingLength.forEach(o => {
    const {
      displayNameTokens,
      displayName
    } = o;

    let subtree: HierarchicalFacetTree = tree;

    for (const token of displayNameTokens.slice(0, -1)) {
      if (!(token in subtree)) {
        console.error(
          `Error parsing hierarchical facet option "${displayName}" at token "${token}". Current tree:`,
          JSON.stringify(tree));
        return;
      }
      if (o.selected) {
        subtree[token].hasSelectedChild = true
      }
      subtree = subtree[token].childTree;
    }

    const lastDisplayNameToken = displayNameTokens[displayNameTokens.length - 1];
    subtree[lastDisplayNameToken] = {
      selected: o.selected,
      facetOption: {
        value: o.value,
        matcher: o.matcher
      },
      hasSelectedChild: false,
      childTree: {}
    };
  });

  return tree;
}