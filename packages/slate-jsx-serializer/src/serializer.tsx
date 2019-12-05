import React, { ReactNode, ReactElement, cloneElement } from 'react';
import { Value, Node, Document, Block, Inline, Mark, Text } from 'slate';
import { PARAGRAPH_TYPE } from '@artibox/slate-common/constants/paragraph';
import { RendererBaseComponent } from '@artibox/slate-common';
import { JsxSerializerRule } from './typings';

export interface CreateJsxSerializerConfig {
  defaultBlockComponent?: RendererBaseComponent;
  blocks?: JsxSerializerRule<Block>[];
  inlines?: JsxSerializerRule<Inline>[];
  marks?: JsxSerializerRule<Mark>[];
}

interface JsxSerializerRuleMap<N> {
  [type: string]: JsxSerializerRule<N> | undefined;
}

let key = 0;

function addKey(element: ReactElement) {
  return cloneElement(element, { key: key++ });
}

function createParagraphSerializerRule(Component: RendererBaseComponent): JsxSerializerRule<Block> {
  return {
    type: PARAGRAPH_TYPE,
    serialize: (children, node) => (node.text !== '' ? <Component>{children}</Component> : <br />)
  };
}

function resolveRulesToMap<N>(
  rules: JsxSerializerRule<N>[],
  initialMap: JsxSerializerRuleMap<N> = {}
): JsxSerializerRuleMap<N> {
  if (rules.length === 0) {
    return {};
  }

  return rules.reduce((acc, rule) => {
    acc[rule.type] = rule;
    return acc;
  }, initialMap);
}

export function createJsxSerializer(config?: CreateJsxSerializerConfig) {
  const { defaultBlockComponent = 'div', blocks = [], inlines = [], marks = [] } = config || {};
  const blocksMap = resolveRulesToMap([...blocks, createParagraphSerializerRule(defaultBlockComponent)]);
  const inlinesMap = resolveRulesToMap(inlines);
  const marksMap = resolveRulesToMap(marks);

  function serializeText(node: Text): ReactNode {
    const { text } = node;

    if (!node.marks) {
      return text;
    }

    return node.marks.reduce<ReactNode>((element, mark) => {
      const rule = marksMap[mark!.type];

      if (!rule) {
        return element;
      }

      const result = rule.serialize(element, mark!);
      return result === undefined ? element : addKey(result);
    }, text);
  }

  function serializeNode(node: Node): ReactNode {
    if (node.object === 'text') {
      return serializeText(node);
    }

    const children = (node.nodes as Document['nodes'])
      .map(n => serializeNode(n!))
      .filter(Boolean)
      .toArray();

    if (node.object === 'block') {
      const rule = blocksMap[node.type];
      const result = rule?.serialize?.(children, node);
      return result === undefined ? children : addKey(result);
    } else if (node.object === 'inline') {
      const rule = inlinesMap?.[node.type];
      const result = rule?.serialize?.(children, node);
      return result === undefined ? children : addKey(result);
    }

    return children;
  }

  function JsxSerializer(value: Value) {
    return serializeNode(value.document);
  }

  return JsxSerializer;
}
