'use client'

import { Tag } from '@/types/blog.type'
import { ActionIcon, Button, Card, Grid, Group, SimpleGrid, Space, Textarea } from '@mantine/core'
import { IconBold, IconHeading, IconItalic, IconLink, IconPhotoDown } from '@tabler/icons'
import React, { useRef, useState } from 'react'
import useStyles from './style'



const Editor = () => {
  const { classes, theme } = useStyles()
  const [markdown, setMarkdown] = useState('')
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleMarkdownChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value)
  }

  const handleTagButtonClick = (tagName: string, type: Tag['type']) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current
      const start = textarea.selectionStart || 0
      const end = textarea.selectionEnd || 0
      const value = textarea.value

      let modifiedValue = value.slice(0, start)
      const selectedText = value.slice(start, end)

      switch (type) {
        case 'link':
          modifiedValue += `[${selectedText}]()`
          break
        case 'heading':
          modifiedValue += `# ${selectedText}`
          break
        case 'bold':
          modifiedValue += `**${selectedText}**`
          break
        case 'italic':
          modifiedValue += `*${selectedText}*`
          break
        case 'image':
          modifiedValue += `![${selectedText}]()`
          break
        default:
          modifiedValue += selectedText
          break
      }

      modifiedValue += value.slice(end)

      setMarkdown(modifiedValue)
      textarea.focus()
      textarea.setSelectionRange(start, start + selectedText.length)
    }
  }

  const handleReply = () => {
    setPreviewModalOpen(true)
  }

  return (
    <>
      <SimpleGrid cols={1} mt={1} spacing={2}>
        <Card p="md" radius={0}>
          <Grid grow>
            <Grid.Col>
              <Group spacing={3}>
                <ActionIcon variant="default" onClick={() => handleTagButtonClick('Link', 'link')}>
                  <IconLink size="1rem" />
                </ActionIcon>
                <ActionIcon
                  variant="default"
                  onClick={() => handleTagButtonClick('Heading', 'heading')}
                >
                  <IconHeading size="1rem" />
                </ActionIcon>
                <ActionIcon variant="default" onClick={() => handleTagButtonClick('Bold', 'bold')}>
                  <IconBold size="1rem" />
                </ActionIcon>
                <ActionIcon
                  variant="default"
                  onClick={() => handleTagButtonClick('Italic', 'italic')}
                >
                  <IconItalic size="1rem" />
                </ActionIcon>
                <ActionIcon
                  variant="default"
                  onClick={() => handleTagButtonClick('Image', 'image')}
                >
                  <IconPhotoDown size="1rem" />
                </ActionIcon>
              </Group>
            </Grid.Col>
            <Grid.Col>
              <Space w="sm" />
              <Textarea
                value={markdown}
                onChange={handleMarkdownChange}
                ref={textareaRef}
                autosize
                minRows={4}
              />
              <Space w="sm" />
            </Grid.Col>
            <Grid.Col>
              <Button
                radius="md"
                size="md"
                color={theme.colorScheme === 'dark' ? undefined : 'dark'}
                onClick={handleReply}
              >
                Reply
              </Button>
            </Grid.Col>
          </Grid>
        </Card>
      </SimpleGrid>
    </>
  )
}

export default Editor
