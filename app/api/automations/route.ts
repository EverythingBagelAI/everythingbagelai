import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');
    const cursor = searchParams.get('cursor');
    const limit = parseInt(searchParams.get('limit') || '10');

    const supabase = await createClient();
    let query = supabase.from('automations').select(`
      *,
      categories:category_id(name),
      sub_categories:sub_category_id(name)
    `);

    // Apply filters
    if (category) {
      query = query.eq('category_id', category);
    }
    if (subCategory) {
      query = query.eq('sub_category_id', subCategory);
    }
    if (cursor) {
      query = query.lt('id', cursor);
    }

    // Get one more item to determine if there are more pages
    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit + 1);

    if (error) {
      throw error;
    }

    // Check if there are more items
    const hasMore = data.length > limit;
    const items = hasMore ? data.slice(0, -1) : data;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    return NextResponse.json({
      items,
      nextCursor,
    });
  } catch (error) {
    console.error('Error in automations GET:', error);
    return NextResponse.json(
      { error: 'Error fetching automations' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const json = await req.json();
    const {
      name,
      creator,
      category_id,
      sub_category_id,
      applications_utilized,
      functionality,
      video_link,
      recipe,
    } = json;

    const { data, error } = await supabase
      .from('automations')
      .insert([
        {
          name,
          creator,
          category_id,
          sub_category_id,
          applications_utilized,
          functionality,
          video_link,
          recipe,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in automations POST:', error);
    return NextResponse.json(
      { error: 'Error creating automation' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const json = await req.json();
    const { id, ...updates } = json;

    const { data, error } = await supabase
      .from('automations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in automations PUT:', error);
    return NextResponse.json(
      { error: 'Error updating automation' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Automation ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('automations')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in automations DELETE:', error);
    return NextResponse.json(
      { error: 'Error deleting automation' },
      { status: 500 }
    );
  }
} 