import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');
    const search = searchParams.get('search');
    const cursor = searchParams.get('cursor');
    const limit = parseInt(searchParams.get('limit') || '10');

    const supabase = createClient();
    let query = supabase.from('applications').select('*');

    // Apply filters
    if (category) {
      query = query.eq('category_id', category);
    }
    if (subCategory) {
      query = query.eq('sub_category_id', subCategory);
    }
    if (search) {
      query = query.textSearch('search_text', search);
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
    console.error('Error in applications GET:', error);
    return NextResponse.json(
      { error: 'Error fetching applications' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createClient();
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
      logo_url,
      category_id,
      sub_category_id,
      type,
      website_url,
      summary,
      key_features,
      pricing_details,
    } = json;

    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          name,
          logo_url,
          category_id,
          sub_category_id,
          type,
          website_url,
          summary,
          key_features,
          pricing_details,
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
    console.error('Error in applications POST:', error);
    return NextResponse.json(
      { error: 'Error creating application' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const supabase = createClient();
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
      .from('applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in applications PUT:', error);
    return NextResponse.json(
      { error: 'Error updating application' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = createClient();
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
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in applications DELETE:', error);
    return NextResponse.json(
      { error: 'Error deleting application' },
      { status: 500 }
    );
  }
} 